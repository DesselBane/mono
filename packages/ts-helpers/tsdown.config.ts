import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/main.ts'],
  tsconfig: 'tsconfig.lib.json',
  dts: true,
  exports: true,
  platform: 'neutral',
  sourcemap: true,
  unused: true,
})
