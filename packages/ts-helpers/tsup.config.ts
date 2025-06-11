import { createDefaultOptions } from '@repo/configs/tsup'
import { defineConfig } from 'tsup'

export default defineConfig({
  ...createDefaultOptions(),
  tsconfig: 'tsconfig.lib.json',
})
