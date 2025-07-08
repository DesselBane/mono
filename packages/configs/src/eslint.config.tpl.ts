import { existsSync } from 'node:fs'
import path from 'node:path'
import { includeIgnoreFile } from '@eslint/compat'
import eslint from '@eslint/js'
import {
  configureVueProject,
  defineConfigWithVueTs,
  vueTsConfigs,
} from '@vue/eslint-config-typescript'
import playwright from 'eslint-plugin-playwright'
import prettierLint from 'eslint-plugin-prettier/recommended'
import pluginVue from 'eslint-plugin-vue'
import type { ConfigWithExtends } from 'typescript-eslint'
import tsEslint, { configs as tsEslintConfigs } from 'typescript-eslint'
import { z } from 'zod'
import { flatConfigs as importPluginFlatConfigs } from 'eslint-plugin-import-x'
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'
import unusedImports from 'eslint-plugin-unused-imports'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'

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
    additionalConfigs: z.array(z.object({}).passthrough()).default([]),
  })
  .transform((schema) => {
    return {
      ...schema,
      useTypeCheckedConfig:
        schema.useTypeCheckedConfig ?? schema.packageDir != undefined,
    }
  })

type SafeOptions = z.infer<typeof optionsSchema>
type Config = ReturnType<typeof tsEslint.config>

export function createEslintConfig(options: Options = {}): Config {
  const safeOptions = optionsSchema.parse(options)

  return tsEslint.config(
    eslint.configs.recommended,
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

    return defineConfigWithVueTs(
      pluginVue.configs['flat/recommended'],
      vueTsConfigs.strictTypeChecked,
      vueTsConfigs.stylisticTypeChecked,
    )
  }

  return tsEslint.config(...pluginVue.configs['flat/recommended'], {
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

  return tsEslint.config({
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
  const config: Config = tsEslint.config({
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
  return tsEslint.config(
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

  return tsEslint.config([
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

// Needs to come after configure typescript
function configureNoUnusedImportsPlugin() {
  return tsEslint.config({
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
  const config: Config = []

  if (options.useTypeCheckedConfig) {
    config.push(
      ...tsEslint.config(
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

  if (options.vue && options.useUnicornPlugin) {
    config.push({
      rules: {
        'unicorn/prevent-abbreviations': [
          'error',
          {
            // Even though fooRef is an abbreviation for fooReference, Ref is a term coined by vue, and it would be more confusing to call variables which hold a vue ref fooReference
            ignore: [/.*Ref(?:[A-Z].*)?/],
          },
        ],
      },
    })
  }

  return tsEslint.config(
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
      },
    },
    {
      rules: {
        curly: 'error',
        '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
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
