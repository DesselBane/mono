import { defineConfig } from 'tsdown'

export default defineConfig({
  platform: 'node',
  tsconfig: 'tsconfig.lib.json',
  entry: ['src/main.ts'],
  dts: false,
  target: ['node20'],
})
