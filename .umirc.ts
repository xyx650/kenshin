/* eslint-disable */
import { defineConfig } from 'dumi'
import { resolve } from 'path'

export default defineConfig({
  title: 'WDCUI🌝',
  favicon:
    'https://www.logosc.cn/uploads/icon/2020/09/03/8ed61bf6-a367-4f29-9e61-ad6804b87eaf.png',
  logo:
    'https://www.logosc.cn/uploads/icon/2020/09/03/8ed61bf6-a367-4f29-9e61-ad6804b87eaf.png',
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
  dynamicImport: {},
  styles: [`
    .__dumi-default-previewer a:-webkit-any-link { text-decoration: none; cursor: normal }
  `],
  headScripts: [
    `
      function loadScript(url, callback) {
        var script = document.createElement('script')
        script.type = 'text/javascript'
        script.async = 'async'
        script.src = url
        document.head.appendChild(script)
        if (script.readyState) {
          script.onreadystatechange = function() {
            if (script.readyState == 'complete' || script.readyState == 'loaded') {
              script.onreadystatechange = null
              callback()
            }
          }
        } else {
          script.onload = function() { callback() }
        }
      }

      loadScript('https://cdnjs.cloudflare.com/ajax/libs/pangu/4.0.7/pangu.min.js', function() {
        pangu.autoSpacingPage()
      })
    `
  ]
})


