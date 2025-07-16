import type { UserConfig } from 'tsdown'

export const libConfig = {
  entry: ['src/main.ts'],
  tsconfig: 'tsconfig.lib.json',
  dts: true,
  exports: true,
  platform: 'neutral',
  sourcemap: true,
  unused: true,
} as const satisfies UserConfig
