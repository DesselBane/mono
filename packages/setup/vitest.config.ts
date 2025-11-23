import { createVitestConfig } from '@desselbane/configs/vitest'
import { defineConfig } from 'vitest/config'

export default defineConfig(
  createVitestConfig({
    enableLevel2: false,
  }),
)
