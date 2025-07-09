import { defineConfig } from 'tsup'
import { createDefaultOptions } from '@desselbane/configs/tsup'

export default defineConfig({
  ...createDefaultOptions(),
  platform: 'node',
  tsconfig: 'tsconfig.lib.json',
})
