import { createDefaultOptions } from '@desselbane/configs/tsup'
import { defineConfig } from 'tsup'

export default defineConfig({
  ...createDefaultOptions(),
  tsconfig: 'tsconfig.lib.json',
})
