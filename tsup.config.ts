import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts', 'src/vite.ts'],
  splitting: false,
  sourcemap: true,
  dts: true,
  external: [
    'vite',
    'unocss',
  ],
  clean: true,
})
