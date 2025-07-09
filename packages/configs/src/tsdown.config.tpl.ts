import type { UserConfig } from 'tsdown'

// eslint-disable-next-line unicorn/prevent-abbreviations
export const libConfig = {
  entry: ['src/main.ts'],
  tsconfig: 'tsconfig.lib.json',
  dts: true,
  exports: true,
  platform: 'neutral',
  sourcemap: true,
  unused: true,
} as const satisfies UserConfig
