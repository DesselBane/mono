import type { InlineConfig } from 'tsdown'

export const libConfig = {
  entry: ['src/main.ts'],
  tsconfig: 'tsconfig.lib.json',
  dts: true,
  exports: true,
  platform: 'neutral',
  sourcemap: true,
  unused: true,
  fixedExtension: false,
} as const satisfies InlineConfig

export const nodeConsoleAppConfig = {
  entry: ['src/main.ts'],
  tsconfig: 'tsconfig.app.json',
  dts: false,
  platform: 'node',
  sourcemap: false,
  unused: true,
  fixedExtension: false,
} as const satisfies InlineConfig
