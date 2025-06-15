/* eslint-disable unicorn/prefer-module */
import { execSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import type { PlopTypes } from '@turbo/gen'
import type { HelperOptions } from 'handlebars'
import { format, resolveConfig } from 'prettier'
import { createPrompts } from './helpers'
import type { AnswersForPrompQuestions } from './helpers'

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  const { prompts, answerSchema, setHelperOptionsSchema } = createPrompts([
    {
      type: 'input',
      name: 'packageName',
      message: 'What is the name of the package?',
    },
    {
      type: 'input',
      name: 'packageDescription',
      message: 'What is the description of the package?',
    },
    {
      name: 'npmScope',
      type: 'list',
      message: 'What is the npm scope of the package?',
      choices: [
        {
          name: 'Private | @repo',
          value: '@repo',
        },
        // Insert npmScope marker
      ],
    },
    {
      name: 'packageType',
      type: 'list',
      message: 'What is the type of the package?',
      choices: [
        {
          name: 'Application',
          value: 'app',
        },
        {
          name: 'Library',
          value: 'lib',
        },
      ],
    },
    {
      type: 'list',
      name: 'runtime',
      message: 'What is the runtime target?',
      default: 'web',
      choices: [
        {
          name: 'web',
          value: 'bundler-web',
        },
        {
          name: 'node',
          value: 'node',
        },
        {
          name: 'node (bundled)',
          value: 'bundler-node',
        },
        {
          name: 'neutral',
          value: 'neutral',
        },
      ],
    },
  ])

  plop.setGenerator('package', {
    description: 'Create a new package with a default config',
    prompts: [...prompts],
    actions: [
      function addHelpers(rawAnswers, config, plopfileApi) {
        const answers = answerSchema.parse(rawAnswers)
        if (plopfileApi == undefined) {
          throw new Error('plopfileApi was null')
        }

        plopfileApi.setHelper(
          'isPrivate',
          function (this: unknown, options: HelperOptions) {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            if (answers.npmScope === '@repo') {
              options.fn(this)
            } else {
              options.inverse(this)
            }
          },
        )

        plopfileApi.setHelper(
          'shouldPublish',
          function (this: unknown, options: HelperOptions) {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            if (answers.npmScope === '@repo') {
              options.inverse(this)
            } else {
              options.fn(this)
            }
          },
        )

        plopfileApi.setHelper(
          'runtimeIsWeb',
          function (this: unknown, options: HelperOptions) {
            if (answers.runtime === 'bundler-web') {
              options.fn(this)
            } else {
              options.inverse(this)
            }
          },
        )

        plopfileApi.setHelper(
          'runtimeIsNode',
          function (this: unknown, options: HelperOptions) {
            if (answers.runtime === 'node') {
              options.fn(this)
            } else {
              options.inverse(this)
            }
          },
        )

        plopfileApi.setHelper(
          'runtimeIsNodeBundled',
          function (this: unknown, options: HelperOptions) {
            if (answers.runtime === 'bundler-node') {
              options.fn(this)
            } else {
              options.inverse(this)
            }
          },
        )

        plopfileApi.setHelper(
          'runtimeIsNeutral',
          function (this: unknown, options: HelperOptions) {
            if (answers.runtime === 'neutral') {
              options.fn(this)
            } else {
              options.inverse(this)
            }
          },
        )

        plopfileApi.setHelper('platform', function () {
          switch (answers.runtime) {
            case 'node':
            case 'bundler-node': {
              return 'node'
            }
            case 'bundler-web': {
              return 'web'
            }
            case 'neutral': {
              return 'neutral'
            }
          }
        })

        plopfileApi.setHelper(
          'isLib',
          function (this: unknown, options: HelperOptions) {
            if (answers.packageType === 'lib') {
              options.fn(this)
            } else {
              options.inverse(this)
            }
          },
        )

        plopfileApi.setHelper('viteDevScript', function () {
          return answers.packageType === 'app' ? 'dev' : 'build --watch'
        })

        function getPackageDirectory() {
          const { packageName } = answers
          const path = `packages`

          return `${path}/${packageName}`
        }

        plopfileApi.setHelper('packageDir', getPackageDirectory)

        plopfileApi.setHelper(
          'packageAbsolutePath',
          function (this: unknown, options: HelperOptions) {
            const { turbo } = setHelperOptionsSchema.parse(options.data).root

            const packagePath = getPackageDirectory()
            return `${turbo.paths.root}/${packagePath}`
          },
        )

        plopfileApi.setHelper('voltaPath', function () {
          const { npmScope } = answers
          switch (npmScope) {
            default: {
              return '../../package.json'
            }
          }
        })

        return 'Added Handlebar helpers'
      },
      {
        type: 'addMany',
        destination: '{{packageAbsolutePath}}',
        templateFiles: 'resources/package/addMany/**',
        base: 'resources/package/addMany',
        verbose: true,
      },
      {
        type: 'add',
        templateFile: 'resources/package/tsconfig.runtime.json.hbs',
        path: '{{packageAbsolutePath}}/tsconfig.{{packageType}}.json',
      },
      {
        type: 'add',
        templateFile: 'resources/package/vite.config.ts.hbs',
        path: '{{packageAbsolutePath}}/vite.config.ts',
        skip: ({ runtime }: AnswersForPrompQuestions<typeof prompts>) => {
          if (runtime !== 'bundler-web') {
            return 'Skipping vite.config.ts'
          }
          return
        },
      },
      {
        type: 'add',
        templateFile: 'resources/package/tsup.config.ts.hbs',
        path: '{{packageAbsolutePath}}/tsup.config.ts',
        skip: ({ runtime }: AnswersForPrompQuestions<typeof prompts>) => {
          if (!['neutral', 'bundler-node'].includes(runtime)) {
            return 'Skipping tsup.config.ts'
          }
          return
        },
      },

      function installDeps(rawAnswers) {
        const answers = answerSchema.parse(rawAnswers)
        const developmentPackages = [
          'typescript',
          '@types/node',
          'vitest',
          'type-fest',
          '@vitest/coverage-v8',
        ]
        const packages = []

        if (answers.runtime === 'bundler-web') {
          developmentPackages.push('vite', 'vite-plugin-dts', 'vue-tsc', 'sass')
          packages.push('@vueuse/core')
        } else if (answers.runtime !== 'node') {
          developmentPackages.push('tsup')
        }

        if (answers.packageType === 'app') {
          developmentPackages.push(
            'vite-plugin-vue-devtools',
            '@vitejs/plugin-vue',
          )
        }

        console.log('Installing depencies...')

        execSync(
          `pnpm -F ${answers.npmScope}/${answers.packageName} add ${developmentPackages.join(' ')} -D`,
          {
            stdio: 'inherit',
          },
        )

        if (packages.length > 0) {
          execSync(
            `pnpm -F ${answers.npmScope}/${answers.packageName} add ${packages.join(' ')}`,
            {
              stdio: 'inherit',
            },
          )
        }
        execSync(`pnpm -F ${answers.npmScope}/${answers.packageName} i`, {
          stdio: 'inherit',
        })

        return 'Installed dependencies'
      },
      function lint(rawAnswers) {
        const answers = answerSchema.parse(rawAnswers)
        console.log('Linting package')
        execSync(
          `pnpm -F ${answers.npmScope}/${answers.packageName} lint:fix`,
          {
            stdio: 'inherit',
          },
        )
        return 'Linted package'
      },
    ],
  })

  const addScopePrompts = createPrompts([
    {
      type: 'input',
      name: 'scopeName',
      message: 'What is the name of the scope?',
    },
    {
      type: 'input',
      name: 'scopeValue',
      message: 'What is the value of the scope?',
    },
  ])

  plop.setGenerator('addScope', {
    description:
      'Add an npm scope to the list of available scopes for the next generated package.',
    prompts: [...addScopePrompts.prompts],
    actions: [
      async function modifyFile(rawAnswers) {
        const answers = addScopePrompts.answerSchema.parse(rawAnswers)

        const value = answers.scopeValue.startsWith('@')
          ? answers.scopeValue
          : `@${answers.scopeValue}`

        const name = `${answers.scopeName} | ${value}`

        const configTs = readFileSync(__filename).toString()

        const modified = configTs.replace(
          '// Insert npmScope marker',
          JSON.stringify({
            name,
            value,
          }) + '\n// Insert npmScope marker',
        )

        const prettierConfig = await resolveConfig(__filename)
        console.log(prettierConfig)

        if (prettierConfig == undefined) {
          throw new Error('Unable to resolve prettier config')
        }

        const formatted = await format(modified, {
          ...prettierConfig,
          parser: 'typescript',
        })

        writeFileSync(__filename, formatted)

        return `Updated ${__filename}`
      },
    ],
  })
}
