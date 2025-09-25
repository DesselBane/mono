import { existsSync } from 'node:fs'
import path from 'node:path'
import { includeIgnoreFile } from '@eslint/compat'
import eslint from '@eslint/js'
import { defineConfig } from 'eslint/config'
import {
  configureVueProject,
  defineConfigWithVueTs,
  vueTsConfigs,
} from '@vue/eslint-config-typescript'
import playwright from 'eslint-plugin-playwright'
import prettierLint from 'eslint-plugin-prettier/recommended'
import pluginVue from 'eslint-plugin-vue'
import type { ConfigWithExtends } from 'typescript-eslint'
import { configs as tsEslintConfigs } from 'typescript-eslint'
import { z } from 'zod'
import { flatConfigs as importPluginFlatConfigs } from 'eslint-plugin-import-x'
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'
import unusedImports from 'eslint-plugin-unused-imports'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'
import vitest from '@vitest/eslint-plugin'

/**
 * How to set up eslint
 */
export type Options = {
  /**
   * Any ignore patterns you need which are not part of `.gitignore` files (see {@link Options#packageDir} and {@link Options#workspaceDir} for more info about `.gitignore` files.
   * @default []
   */
  ignores?: string[]
  /**
   * The absolut path to the package. This path will be used to determine the location of `tsconfig.json` files as well as `.gitignore` files. If it is not provided typescript-eslint can not use the `*typeChecked` config files and there will be no automatic ignores based on `.gitignore` files.
   * @example
   * ```javascript
   * import path from 'node:path'
   * import { createEslintConfig } from '@desselbane/configs/eslint'
   *
   * export default createEslintConfig({
   *   packageDir: import.meta.dirname,
   *   workspaceDir: path.join(import.meta.dirname, '..', '..'),
   * })
   * ```
   */
  packageDir?: string
  /**
   * The absolut path to the workspace. This is the root folder of a mono-repo. This path is used to determine the location of the global `.gitignore` file. If it is not provided there will be no automatic ignores based on the `.gitignore` file.
   * @example
   * ```javascript
   * import path from 'node:path'
   * import { createEslintConfig } from '@desselbane/configs/eslint'
   *
   * export default createEslintConfig({
   *   packageDir: import.meta.dirname,
   *   workspaceDir: path.join(import.meta.dirname, '..', '..'),
   * })
   * ```
   */
  workspaceDir?: string
  /**
   * Whether to use the typeChecked variants of the typescript-eslint configs.
   * @default true if {@link Options.packageDir} is set
   */
  useTypeCheckedConfig?: boolean

  /**
   * Whether to include eslint-plugin-vue rules
   * @default false
   */
  vue?: boolean
  /**
   * Whether to include eslint-plugin-playwright rules
   * @default false
   */
  playwright?: boolean

  /**
   * Whether to include eslint-plugin-unicorn rules
   * @see https://github.com/sindresorhus/eslint-plugin-unicorn/tree/main
   * @default true
   */
  useUnicornPlugin?: boolean

  /**
   * This is used as value for the `files` property to override eslint rules for test files (like allowing any etc.)
   * @default ['** /*.spec.ts', '** /*.test.ts', '** /__mocks__/** /*.ts'] (without the spaces)
   */
  testMatch?: string[]

  /**
   * Additional config objects which will be passed to eslint
   */
  additionalConfigs?: ConfigWithExtends[]
}

const optionsSchema = z
  .object({
    ignores: z.array(z.string()).default([]),
    packageDir: z.string().optional(),
    workspaceDir: z.string().optional(),
    useTypeCheckedConfig: z.boolean().optional(),
    vue: z.boolean().default(false),
    useUnicornPlugin: z.boolean().default(true),
    playwright: z.boolean().default(false),
    testMatch: z
      .array(z.string())
      .default(['**/*.spec.ts', '**/*.test.ts', '**/__mocks__/**/*.ts']),
    additionalConfigs: z.array(z.looseObject({})).default([]),
  })
  .transform((schema) => {
    return {
      ...schema,
      useTypeCheckedConfig:
        schema.useTypeCheckedConfig ?? schema.packageDir != undefined,
    }
  })

type SafeOptions = z.infer<typeof optionsSchema>
type Config = ReturnType<typeof defineConfig>

export function createEslintConfig(options: Options = {}): Config {
  const safeOptions = optionsSchema.parse(options)

  return defineConfig(
    eslint.configs.recommended,
    ...configureVitestPlugin(safeOptions),
    ...configureUnicornPlugin(safeOptions),
    ...configureImportPlugin(safeOptions),
    ...configurePlaywright(safeOptions),
    ...configureVue(safeOptions),
    ...configureTypescript(safeOptions),
    ...configureNoUnusedImportsPlugin(),
    ...configureAdditionalRules(safeOptions),
    ...configureIgnores(safeOptions),
    ...safeOptions.additionalConfigs,
    prettierLint,
  )
}

function configureVue(options: SafeOptions): Config {
  if (!options.vue) {
    return []
  }

  if (options.useTypeCheckedConfig) {
    configureVueProject({
      rootDir: options.packageDir,
    })

    // @ts-expect-error TODO fix this
    return defineConfigWithVueTs(
      pluginVue.configs['flat/recommended'],
      vueTsConfigs.strictTypeChecked,
      vueTsConfigs.stylisticTypeChecked,
    )
  }

  return defineConfig(...pluginVue.configs['flat/recommended'], {
    files: ['*.vue', '**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
    },
  })
}

function configurePlaywright(options: SafeOptions): Config {
  if (!options.playwright) {
    return []
  }

  return defineConfig({
    ...playwright.configs['flat/recommended'],
    files: ['tests/**'],
    settings: {
      playwright: {
        globalAliases: {
          test: ['setup', 'frontendTest', 'bffTest'],
          expect: ['expect'],
        },
      },
    },
  })
}

function configureIgnores(options: SafeOptions): Config {
  const config: Config = defineConfig({
    ignores: [
      '**/*.d.ts',
      // Ignores all js files in the root of a package since these are typically config files and can be safely ignored
      '*.js',
      ...options.ignores,
    ],
  })

  const packageGitignorePath = path.join(options.packageDir ?? '', '.gitignore')
  if (options.packageDir != undefined && existsSync(packageGitignorePath)) {
    config.push(includeIgnoreFile(packageGitignorePath))
  }

  const workspaceGitignorePath = path.join(
    options.workspaceDir ?? '',
    '.gitignore',
  )
  if (options.workspaceDir != undefined && existsSync(workspaceGitignorePath)) {
    config.push(includeIgnoreFile(workspaceGitignorePath))
  }

  return config
}

function configureTypescript(options: SafeOptions): Config {
  // If vue is enabled the tsEslint configs are added through the vue plugin
  if (options.vue) {
    return []
  }

  return options.useTypeCheckedConfig
    ? [
        ...tsEslintConfigs.strictTypeChecked,
        ...tsEslintConfigs.stylisticTypeChecked,
      ]
    : [...tsEslintConfigs.strict, ...tsEslintConfigs.stylistic]
}

function configureImportPlugin(options: SafeOptions): Config {
  return defineConfig(
    // @ts-expect-error TODO fix this
    importPluginFlatConfigs.recommended,
    importPluginFlatConfigs.typescript,
    {
      settings: {
        'import-x/resolver-next': [
          createTypeScriptImportResolver({
            project: options.packageDir,
          }),
        ],
      },
    },
    {
      rules: {
        'import-x/consistent-type-specifier-style': [
          'error',
          'prefer-top-level',
        ],
        'import-x/no-deprecated': 'warn',
        'import-x/no-mutable-exports': 'error',
        'import-x/no-unused-modules': 'error',
        'import-x/no-cycle': 'warn',
        'import-x/no-self-import': 'warn',
        'import-x/first': 'error',
        'import-x/newline-after-import': 'error',
        'import-x/no-anonymous-default-export': 'error',
        'import-x/no-unresolved': [
          'error',
          {
            ignore: ['^shell$'],
          },
        ],
        'import-x/order': [
          'error',
          {
            'newlines-between': 'never',
          },
        ],
      },
    },
  )
}

function configureUnicornPlugin(options: SafeOptions): Config {
  if (!options.useUnicornPlugin) {
    return []
  }

  return defineConfig([
    eslintPluginUnicorn.configs.all,
    {
      rules: {
        'unicorn/filename-case': [
          'error',
          {
            case: 'kebabCase',
            multipleFileExtensions: false,
          },
        ],
        'unicorn/no-keyword-prefix': 'off',
        'unicorn/prevent-abbreviations': 'off',
      },
    },
    {
      files: options.testMatch,
      rules: {
        // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/import-style.md
        // Allow namespace imports in tests for spying on module methods
        'unicorn/import-style': [
          'error',
          {
            extendDefaultStyles: false,
            styles: {
              util: {
                named: true,
                namespace: true,
              },
              path: {
                default: true,
                namespace: true,
              },
              chalk: {
                default: true,
                namespace: true,
              },
            },
          },
        ],
      },
    },
    // See https://github.com/sindresorhus/eslint-plugin-unicorn/issues/2642
    // Turn off filename-case inside mocks directory as these files must be called like the module they are mocking
    {
      files: ['**/__mocks__/**/*'],
      rules: {
        'unicorn/filename-case': 'off',
      },
    },
  ])
}

function configureVitestPlugin(options: SafeOptions): Config {
  return defineConfig(
    {
      files: options.testMatch, // or any other pattern
      ...vitest.configs.all,
      settings: {
        vitest: {
          typecheck: options.useTypeCheckedConfig,
        },
      },
    },
    {
      files: options.testMatch, // or any other pattern
      rules: {
        'vitest/no-disabled-tests': 'error',
        'vitest/consistent-test-filename': 'off',
        'vitest/prefer-expect-assertions': 'off',
        'vitest/no-conditional-expect': 'off',
        'vitest/no-conditional-in-test': 'off',
        'vitest/no-conditional-test': 'off',
        'vitest/prefer-called-with': 'off',
        'vitest/prefer-to-be-falsy': 'off',
        'vitest/prefer-to-be-truthy': 'off',
        'vitest/consistent-test-it': 'off',
        'vitest/require-hook': 'off',
        'vitest/max-expects': 'off',
        'vitest/require-top-level-describe': 'off',
        'vitest/no-standalone-expect': 'off',
        'vitest/prefer-importing-vitest-globals': 'off',
        'vitest/no-importing-vitest-globals': 'error',
      },
    },
  )
}

// Needs to come after configure typescript
function configureNoUnusedImportsPlugin() {
  return defineConfig({
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  })
}

function configureAdditionalRules(options: SafeOptions): Config {
  const config: Config = [
    {
      linterOptions: {
        reportUnusedInlineConfigs: 'error',
        reportUnusedDisableDirectives: 'error',
      },
    },
  ]

  if (options.useTypeCheckedConfig) {
    config.push(
      ...defineConfig(
        {
          languageOptions: {
            parserOptions: {
              projectService: true,
              tsconfigRootDir: options.packageDir,
            },
          },
        },
        {
          files: options.testMatch,
          rules: {
            '@typescript-eslint/unbound-method': 'off',
            '@typescript-eslint/only-throw-error': 'off',
          },
        },
        {
          rules: {
            '@typescript-eslint/strict-boolean-expressions': [
              'error',
              {
                allowAny: false,
                allowNullableBoolean: false,
                allowNullableEnum: false,
                allowNullableNumber: false,
                allowNullableObject: false,
                allowNullableString: false,
                allowNumber: false,
                allowRuleToRunWithoutStrictNullChecksIKnowWhatIAmDoing: false,
                allowString: false,
              },
            ],
            '@typescript-eslint/restrict-template-expressions': [
              'error',
              {
                allowAny: true,
                allowBoolean: true,
                allowNullish: true,
                allowNumber: true,
                allowRegExp: true,
              },
            ],
            '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
            '@typescript-eslint/no-unnecessary-condition': [
              'error',
              {
                allowConstantLoopConditions: true,
              },
            ],
          },
        },
      ),
    )
  }

  if (
    options.useTypeCheckedConfig &&
    options.playwright &&
    options.useUnicornPlugin
  ) {
    config.push({
      rules: {
        // missing-playwright-await conflicts with unicorn/prefer-ternary and as long as @typescript-eslint/no-floating-promises is enabled its safe to disable this rule
        'playwright/missing-playwright-await': 'off',
      },
    })
  }

  return defineConfig(
    ...config,
    {
      files: options.testMatch,
      rules: {
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        'no-empty-pattern': [
          'error',
          {
            allowObjectPatternsAsParameters: true,
          },
        ],
      },
    },
    {
      rules: {
        curly: 'error',

        '@typescript-eslint/consistent-type-imports': [
          'error',
          {
            fixStyle: 'separate-type-imports',
            prefer: 'type-imports',
          },
        ],

        // Disabled until https://github.com/typescript-eslint/typescript-eslint/issues/10418 is resolved
        '@typescript-eslint/no-invalid-void-type': 'off',
      },
    },
  )
}
