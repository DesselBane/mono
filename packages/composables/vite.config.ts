import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

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
})
