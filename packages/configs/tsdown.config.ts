import { defineConfig } from 'tsdown'
import { libConfig  } from './src/tsdown.config.tpl.ts'

export default defineConfig({
  ...libConfig,
  entry: [
    'src/*.tpl.ts',
    'src/vitest.setup.ts',
    'src/vitest-serializer.setup.ts',
  ],
  platform: 'node',
  exports: false,
})
