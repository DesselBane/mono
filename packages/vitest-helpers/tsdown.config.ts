import { defineConfig } from 'tsdown'
import { libConfig } from '@desselbane/configs/tsdown'

export default defineConfig({
  ...libConfig,
  platform: 'node',
  unbundle: true,
  entry: {
    utils: 'src/utils.ts',
    'node/fs': 'src/node/fs.ts',
    'node/child_process': 'src/node/child_process.ts',
  },
})
