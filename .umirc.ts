/* eslint-disable */
import { defineConfig } from 'dumi'
import { resolve } from 'path'

export default defineConfig({
  title: 'WDCUI',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'site',
  // more config: https://d.umijs.org/config
  targets: { ie: 9 },
  polyfill: {
    // 兼容臭名昭著 IE9+ 的 polyfill
    imports: ['element-remove', 'babel-polyfill']
  },
  // mode: 'site',
  hash: true,
  history: { type: 'hash' },
  publicPath: './',
  dynamicImport: {}
})
