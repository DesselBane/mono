import { defineConfig } from 'tsdown'
import { libConfig } from '@desselbane/configs/tsdown'

export default defineConfig({
  ...libConfig,
  platform: 'node',
  unbundle: true,
  exports: {
    customExports(exports) {
      const newExports: Record<string, unknown> = {
        ...exports,
        '.': exports['./main'] as unknown,
      }
      delete newExports['./main']

      return newExports
    },
  },
  entry: {
    main: 'src/main.ts',
    'node/fs': 'src/mocks/node/fs.ts',
    'node/child_process': 'src/mocks/node/child_process.ts',
  },
})
