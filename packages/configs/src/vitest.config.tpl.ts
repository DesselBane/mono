import type { InlineConfig } from 'vitest/node'

export type CreateVitestConfigOptions = {
  /**
   * Use the vue3-snapshot-serializer package to clean up snapshots
   * @default true
   */
  useVue3SnapshotSerializer?: boolean
}

type VitestConfig = {
  test: InlineConfig
}

export const defaultOptions = {
  test: {
    globals: true,
    clearMocks: true,
    pool: 'threads',
    setupFiles: [
      '@repo/configs/vitest.setup.js',
      '@repo/configs/vitest-serializer.setup.js',
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
    },
  },
} as const satisfies VitestConfig

export function createVitestConfig({
  useVue3SnapshotSerializer,
}: CreateVitestConfigOptions = {}): VitestConfig {
  useVue3SnapshotSerializer ??= true
  const config: VitestConfig = { ...defaultOptions }

  if (!useVue3SnapshotSerializer) {
    config.test.setupFiles = defaultOptions.test.setupFiles.filter(
      (x) => x !== '@repo/configs/vitest-serializer.setup.js',
    )
  }

  return config
}

export default createVitestConfig()
