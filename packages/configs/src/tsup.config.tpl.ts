import type { Options as TsupOptions } from 'tsup'
import { defineConfig } from 'tsup'

export type CreateOptions = {
  /**
   * Produce cjs compliant output. If this is `true` it will also inject shims for `__dirname`/`import.meta.dirname`, see {@link TsupOptions#shims}
   * @default false
   */
  supportCjs?: boolean
}

export const defaultTsupOptions = {
  entry: ['src/main.ts'],
  platform: 'neutral',
  dts: true,
  clean: true,
  format: ['esm'],
  noExternal: [/#.*/, /^@repo.*/],
} as const satisfies TsupOptions

export function createDefaultOptions(options: CreateOptions = {}): TsupOptions {
  options.supportCjs ??= false

  const tsupConfig: TsupOptions = {
    ...defaultTsupOptions,
  }

  if (options.supportCjs) {
    tsupConfig.format = ['esm', 'cjs']
    tsupConfig.cjsInterop = true
    tsupConfig.shims = true
  }

  return tsupConfig
}

/**
 * Options used to customize tsup.
 */
export type Options = CreateOptions & {
  /**
   * Entry points passed to tsup. See {@link TsupOptions#entry} for more info.
   * @default ['src/main.ts']
   */
  entry?: TsupOptions['entry']

  /**
   * Platform to target. See {@link TsupOptions#platform} for more info. NOTE that the default is changed.
   * @default 'neutral'
   */
  platform?: TsupOptions['platform']

  /**
   * Which tsconfig to use for dts generation. See {@link TsupOptions#tsconfig}.
   */
  tsconfig?: TsupOptions['tsconfig']
  splitting?: TsupOptions['splitting']

  /**
   * Generate typescript definition files
   * @default true
   */
  dts?: TsupOptions['dts']

  /**
   * Always bundle modules matching given patterns. This is always merged with [/#.* /, /^@repo.* /]
   */
  noExternal?: TsupOptions['noExternal']
}

/**
 * Create a tsup config
 * @deprecated Instead of using `createTsupConfig` create default options using `createDefaultOptions`
 * ```ts
 * // Before
 * export default createTsupConfig({
 *   entry: ['src/*.ts', '!src/*.d.ts'],
 *   tsconfig: 'tsconfig.lib.json',
 *   supportCjs: true,
 *   platform: 'node',
 *   external: ['@vue/test-utils'],
 * })
 *
 * // After
 * import { defineConfig } from 'tsup'
 * export default defineConfig({
 *   ...createDefaultOptions({
 *     supportCjs: true,
 *   }),
 *   entry: ['src/*.ts', '!src/*.d.ts'],
 *   tsconfig: 'tsconfig.lib.json',
 *   platform: 'node',
 *   external: ['@vue/test-utils'],
 * })
 * ```
 * @param options
 */
export function createTsupConfig(
  options: Options = {},
): ReturnType<typeof defineConfig> {
  options.entry ??= defaultTsupOptions.entry
  options.platform ??= defaultTsupOptions.platform
  options.dts ??= defaultTsupOptions.dts
  options.supportCjs ??= false
  options.noExternal ??= []

  const tsupConfig: TsupOptions = {
    ...defaultTsupOptions,
    splitting: options.splitting,
    entry: options.entry,
    platform: options.platform,
    tsconfig: options.tsconfig,
    dts: options.dts,
    noExternal: [...defaultTsupOptions.noExternal, ...options.noExternal],
  }

  if (options.supportCjs) {
    tsupConfig.format = ['esm', 'cjs']
    tsupConfig.cjsInterop = true
    tsupConfig.shims = true
  }

  return defineConfig(tsupConfig)
}

// eslint-disable-next-line @typescript-eslint/no-deprecated
export default createTsupConfig()
