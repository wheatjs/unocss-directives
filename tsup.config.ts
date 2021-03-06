import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts', 'src/vite.ts'],
  splitting: false,
  dts: true,
  format: ['cjs', 'esm'],
  external: [
    'vite',
    'unocss',
  ],
  clean: true,
})
