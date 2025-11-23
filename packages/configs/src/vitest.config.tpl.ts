import path from 'node:path'
import { hostname } from 'node:os'
import type { InlineConfig } from 'vitest/node'
import { playwright } from '@vitest/browser-playwright'
import { z } from 'zod'

const environmentSchema = z.object({
  CI: z.stringbool().default(false),
})

const env = environmentSchema.parse(process.env)

const host = env.CI ? 'CI' : hostname()

type VitestConfig = {
  test: InlineConfig
}

type TestProjectConfiguration = Exclude<
  InlineConfig['projects'],
  undefined
>[number]

export const generalVitestConfig = {
  globals: false,
  mockReset: true,
  unstubEnvs: true,
  unstubGlobals: true,
  pool: 'threads',
  setupFiles: [
    '@desselbane/configs/vitest.setup.js',
    '@desselbane/configs/vitest-serializer.setup.js',
  ],
  sequence: {
    shuffle: true,
    concurrent: false,
  },
  expect: {
    requireAssertions: true,
  },
  coverage: {
    provider: 'v8',
    exclude: ['**/__mocks__/**'],
  },
} as const satisfies InlineConfig

export const level0TestProject = {
  extends: true,
  test: {
    name: 'L0|Type',
    include: [],
    typecheck: {
      enabled: true,
      include: ['**/*.l0.spec.ts'],
    },
  },
} as const satisfies TestProjectConfiguration

export const level1TestProject = {
  extends: true,
  test: {
    name: 'L1|Unit',
    include: ['**/*.l1.spec.ts'],
    setupFiles: ['./vitest.setup.l1.ts', './vitest.setup.ts'],
    environment: 'node',
  },
} as const satisfies TestProjectConfiguration

export type Level2Options = {
  isCI?: boolean
  vitestAttachmentsDir?: string
  host?: string
}
export function createLevel2TestProject({
  isCI,
  vitestAttachmentsDir,
  host,
}: Level2Options) {
  return {
    extends: true,
    test: {
      name: 'L2|Component',
      include: ['**/*.l2.spec.ts'],
      setupFiles: ['./vitest.setup.l2.ts', './vitest.setup.ts'],
      retry: isCI === true ? 2 : 0,
      browser: {
        enabled: true,
        provider: playwright(),
        headless: true,
        testerHtmlPath: './test-index.html',
        instances: [{ browser: 'chromium' }],
        trace: {
          mode: 'on-first-retry',
          tracesDir:
            vitestAttachmentsDir == undefined
              ? undefined
              : path.join(vitestAttachmentsDir, '__traces__'),
          screenshots: false,
          snapshots: true,
        },
        expect: {
          toMatchScreenshot: {
            comparatorName: 'pixelmatch',
            comparatorOptions: {
              threshold: 0,
              allowedMismatchedPixels: 0,
            },
            resolveScreenshotPath: ({
              arg,
              browserName,
              ext,
              testFileDirectory,
            }) =>
              path.join(
                testFileDirectory,
                '__screenshots__',
                `${arg}.${browserName}.${host}${ext}`,
              ),

            resolveDiffPath: ({ arg, browserName, ext, testFileDirectory }) =>
              path.join(
                testFileDirectory,
                '__screenshots__',
                `${arg}.${browserName}.${host}${ext}`,
              ),
          },
        },
      },
    },
  } as const satisfies TestProjectConfiguration
}

export const level2TestProject = createLevel2TestProject({ isCI: env.CI, host })

export const defaultVitestConfig = {
  test: {
    ...generalVitestConfig,
    projects: [level0TestProject, level1TestProject, level2TestProject],
  },
} as const satisfies VitestConfig

export type CreateVitestConfigOptions = {
  /**
   * Use the vue3-snapshot-serializer package to clean up snapshots
   * @default true
   */
  useVue3SnapshotSerializer?: boolean
  /**
   * Enable level 0 type tests with the `*.l0.spec.ts` extension
   * @default true
   */
  enableLevel0?: boolean
  /**
   * Enable level 1 unit tests with the `*.l1.spec.ts` extension
   * @default true
   */
  enableLevel1?: boolean
  /**
   * Enable level 2 component tests with the `*.l2.spec.ts` extension powered by playwright
   * @default true
   */
  enableLevel2?: boolean
}
export function createVitestConfig({
  useVue3SnapshotSerializer,
  enableLevel0,
  enableLevel1,
  enableLevel2,
}: CreateVitestConfigOptions = {}): VitestConfig {
  useVue3SnapshotSerializer ??= true
  enableLevel0 ??= true
  enableLevel1 ??= true
  enableLevel2 ??= true

  const projects: TestProjectConfiguration[] = []

  if (enableLevel0) {
    projects.push(level0TestProject)
  }

  if (enableLevel1) {
    projects.push(level1TestProject)
  }

  if (enableLevel2) {
    projects.push(level2TestProject)
  }

  const config: VitestConfig = {
    test: {
      ...generalVitestConfig,
      projects,
    },
  }
  if (!useVue3SnapshotSerializer) {
    config.test.setupFiles = defaultVitestConfig.test.setupFiles.filter(
      (x) => x !== '@desselbane/configs/vitest-serializer.setup.js',
    )
  }

  return config
}

export default createVitestConfig()
