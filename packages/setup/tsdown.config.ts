import { defineConfig } from 'tsdown'
import { nodeConsoleAppConfig } from '@desselbane/configs/tsdown'

export default defineConfig({
  ...nodeConsoleAppConfig,
  entry: ['src/main.ts', 'src/read-package-list.ts'],
})
