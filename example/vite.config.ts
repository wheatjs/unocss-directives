import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { presetAttributify, presetUno } from 'unocss'
import UnocssDirectives from '../dist/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    UnocssDirectives({
      presets: [
        presetUno(),
        presetAttributify(),
      ],
    }),
  ],
})
