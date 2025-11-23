import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { createVitestConfig } from '@desselbane/configs/vitest'

export default defineConfig({
  plugins: [
    dts({
      tsconfigPath: './tsconfig.lib.json',
    }),
  ],
  build: {
    lib: {
      fileName: 'main',
      entry: 'src/main.ts',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['vue'],
    },
  },
  test: createVitestConfig({
    enableLevel2: false,
  }).test,
})
