import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import path from 'path'
// https://vitejs.dev/config/
/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [
    uni(),
  ],
  resolve:{
    alias:[
      {
        find: '@',
        replacement: path.resolve(__dirname, './src')
      }
    ]
  }
})
