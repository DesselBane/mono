import type { PlopTypes } from '@turbo/gen'
import { execSync } from 'node:child_process'

type MyAnswers = {
  packageName: string
  packageDescription: string
  npmScope: '@repo' | '@desselbane'
  packageType: 'app' | 'lib'
  runtime: 'node' | 'bundler-web' | 'bundler-node' | 'neutral'
  turbo: {
    paths: {
      cwd: string
      root: string
      workspace: string
    }
  }
}

type MyOptions = {
  data: {
    root: MyAnswers
  }
  fn: (helperThis: unknown) => void
  inverse: (helperThis: unknown) => void
}

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  // create a generator
  plop.setGenerator('package', {
    description: 'Create a new package with a default config',
    // gather information from the user
    prompts: [
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
          {
            name: 'Personal | @desselbane',
            value: '@desselbane',
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
    ],
    // perform actions based on the prompts
    actions: [
      function addHelpers(answers: MyAnswers, config, plopfileApi) {
        plopfileApi.setHelper('isPrivate', function (options: MyOptions) {
          return options.data.root.npmScope == '@repo'
            ? options.fn(this)
            : options.inverse(this)
        })
        plopfileApi.setHelper('shouldPublish', function (options: MyOptions) {
          return options.data.root.npmScope != '@repo'
            ? options.fn(this)
            : options.inverse(this)
        })

        plopfileApi.setHelper('runtimeIsWeb', function (options: MyOptions) {
          return options.data.root.runtime === 'bundler-web'
            ? options.fn(this)
            : options.inverse(this)
        })

        plopfileApi.setHelper('runtimeIsNode', function (options: MyOptions) {
          return options.data.root.runtime === 'node'
            ? options.fn(this)
            : options.inverse(this)
        })

        plopfileApi.setHelper(
          'runtimeIsNodeBundled',
          function (options: MyOptions) {
            return options.data.root.runtime === 'bundler-node'
              ? options.fn(this)
              : options.inverse(this)
          },
        )

        plopfileApi.setHelper(
          'runtimeIsNeutral',
          function (options: MyOptions) {
            return options.data.root.runtime === 'neutral'
              ? options.fn(this)
              : options.inverse(this)
          },
        )

        plopfileApi.setHelper('platform', function (options: MyOptions) {
          switch (options.data.root.runtime) {
            case 'node':
            case 'bundler-node':
              return 'node'
            case 'bundler-web':
              return 'web'
            case 'neutral':
              return 'neutral'
          }
        })

        plopfileApi.setHelper('isLib', function (options: MyOptions) {
          return options.data.root.packageType === 'lib'
            ? options.fn(this)
            : options.inverse(this)
        })

        plopfileApi.setHelper('viteDevScript', function (options: MyOptions) {
          return options.data.root.packageType === 'app'
            ? 'dev'
            : 'build --watch'
        })

        function getPackageDir(options: MyOptions) {
          const { packageName, npmScope } = options.data.root
          let path = `packages`

          return `${path}/${packageName}`
        }

        plopfileApi.setHelper('packageDir', getPackageDir)

        plopfileApi.setHelper(
          'packageAbsolutePath',
          function (options: MyOptions) {
            const packagePath = getPackageDir(options)
            return `${options.data.root.turbo.paths.root}/${packagePath}`
          },
        )

        plopfileApi.setHelper('voltaPath', function (options: MyOptions) {
          const { npmScope } = options.data.root
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
        skip: ({ runtime }: MyAnswers) => {
          if (runtime !== 'bundler-web') {
            return 'Skipping vite.config.ts'
          }
        },
      },
      {
        type: 'add',
        templateFile: 'resources/package/tsdown.config.ts.hbs',
        path: '{{packageAbsolutePath}}/tsdown.config.ts',
        skip: ({ runtime }: MyAnswers) => {
          if (!['neutral', 'bundler-node'].includes(runtime)) {
            return 'Skipping tsdown.config.ts'
          }
        },
      },

      function installDeps(answers: MyAnswers) {
        const devPackages = [
          'typescript',
          'vitest',
          'type-fest',
          '@vitest/coverage-v8',
        ]
        const packages = []

        if (answers.runtime === 'bundler-web') {
          devPackages.push('vite', 'vite-plugin-dts', 'vue-tsc', 'sass')
          packages.push('@vueuse/core')
        } else if (answers.runtime !== 'node') {
          devPackages.push('tsdown', 'unplugin-unused')
        }

        if (answers.runtime === 'bundler-node' || answers.runtime === 'node') {
          devPackages.push('@types/node')
        }

        if (answers.packageType === 'app') {
          devPackages.push('vite-plugin-vue-devtools', '@vitejs/plugin-vue')
        }

        console.log('Installing depencies...')

        execSync(
          `pnpm -F ${answers.npmScope}/${answers.packageName} add ${devPackages.join(' ')} -D`,
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
      function lint(answers: MyAnswers) {
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
