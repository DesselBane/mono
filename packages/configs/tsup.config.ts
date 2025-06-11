import { defineConfig } from 'tsup'
import { createDefaultOptions } from './src/tsup.config.tpl.js'

export default defineConfig([
  {
    ...createDefaultOptions({ supportCjs: true }),
    entry: ['src/*.ts', '!src/*.d.ts', '!src/vitest.setup.ts'],
    tsconfig: 'tsconfig.lib.json',
    platform: 'node',
  },
  {
    ...createDefaultOptions({ supportCjs: false }),
    entry: ['src/vitest.setup.ts', 'src/vitest-serializer.setup.ts'],
    tsconfig: 'tsconfig.lib.json',
    platform: 'node',
    external: ['@vue/test-utils'],
  },
])
