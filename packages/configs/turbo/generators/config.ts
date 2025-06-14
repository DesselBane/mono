import { execSync } from 'node:child_process'
import type { PlopTypes } from '@turbo/gen'
import type { SimplifyDeep, UnknownRecord } from 'type-fest'
import { z } from 'zod/v4'
import type { ZodLiteral, ZodString } from 'zod/v4'
import type { HelperOptions } from 'handlebars'

/**
 * Prompts
 */

type Prompt = {
  name: string
  message: string
  prefix?: string
  suffix?: string
}

type InputPrompt = Prompt & {
  type: 'input'
}

type ListPrompt = Prompt & {
  type: 'list'
  choices: readonly { name: string; value: string }[]
}

type AllowedPrompt = InputPrompt | ListPrompt

type AllowedPrompQuestions = readonly AllowedPrompt[]

type ValueForPrompt<TPrompt extends AllowedPrompt> = TPrompt extends InputPrompt
  ? string
  : TPrompt extends ListPrompt
    ? TPrompt['choices'][number]['value']
    : never

type AnswersForPrompQuestions<TPrompts extends AllowedPrompQuestions> =
  SimplifyDeep<{
    [Entry in TPrompts[number]['name']]: ValueForPrompt<
      Extract<TPrompts[number], { name: Entry }>
    >
  }>

/**
 * Zod
 */

type SchemaForPrompt<TPrompt extends AllowedPrompt> =
  TPrompt extends InputPrompt
    ? ZodString
    : TPrompt extends ListPrompt
      ? ZodLiteral<TPrompt['choices'][number]['value']>
      : never

type AnswerSchemaForPrompQuestions<TPrompts extends AllowedPrompQuestions> =
  SimplifyDeep<{
    [Entry in TPrompts[number]['name']]: SchemaForPrompt<
      Extract<TPrompts[number], { name: Entry }>
    >
  }>

function createPrompts<const TPrompt extends AllowedPrompQuestions>(
  prompts: TPrompt,
) {
  const unfinishedAnswers: UnknownRecord = {}

  for (const singlePrompt of prompts) {
    switch (singlePrompt.type) {
      case 'input': {
        unfinishedAnswers[singlePrompt.name] = z.string()
        break
      }
      case 'list': {
        unfinishedAnswers[singlePrompt.name] = z.literal(
          singlePrompt.choices.map((choice) => choice.value),
        )
      }
    }
  }

  const answers = unfinishedAnswers as AnswerSchemaForPrompQuestions<TPrompt>

  const answerSchema = z.looseObject(answers)

  const turboOptionsSchema = z.object({
    turbo: z.object({
      paths: z.object({
        root: z.string(),
        cwd: z.string(),
        workspace: z.string(),
      }),
      configs: z.array(
        z.object({
          turboConfigPath: z.string(),
          workspacePath: z.string(),
          isRootConfig: z.boolean(),
          config: z.object({
            ui: z.string().optional(),
            globalEnv: z.array(z.string()).optional(),
            globalPassThroughEnv: z.array(z.string()).optional(),
            tasks: z.record(
              z.string(),
              z
                .object({
                  dependsOn: z.array(z.string()).optional(),
                  outputs: z.array(z.string()).optional(),
                  persitent: z.boolean().optional(),
                  cache: z.boolean().optional(),
                  interruptible: z.boolean().optional(),
                })
                .optional(),
            ),
          }),
        }),
      ),
    }),
  })

  const setHelperOptionsSchema = z.looseObject({
    root: turboOptionsSchema.extend(answerSchema.shape),
  })

  return {
    answerSchema,
    setHelperOptionsSchema,
    prompts,
  }
}

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
}
