/****************
 * 忽略清单
 ****************/
const ignoresMap = {
  overview: ['index'],
  checkbox: ['index', 'basic']
}


const fs = require('fs')
let args = process.argv.slice(2)
const filePath = './components/'

let argsStr = args.join(',')
// 是否强制更新，忽略ignoresMap
const isForce = argsStr.indexOf('!') !== -1
argsStr = argsStr.replace('!', '')
// 是否忽略入口，index.zh-CN.md
const isIgnoreIndex = argsStr.indexOf('+') === -1 && !isForce
argsStr = argsStr.replace('+', '')
args = argsStr.split(',')
// 是否忽略 demo/basic.md，default:true
const index = args.findIndex(i => i === 'true' || i === 'false')
const isIgnoreBasic = index > -1 ? String(args.splice(index, 1)) : 'true'
// 传入的后缀名
let sufName = args.find(s => s !== 'true' || s !== 'false')

const keys = Object.keys(ignoresMap)
const ignoreSet = new Set([])

const readdir = path => new Promise((resolve, reject) => {
  fs.readdir(path, (err, files) => {
    err ? reject(err) : resolve(files)
  })
})

const rename = (oldPath, newPath) => new Promise((resolve, reject) => {
  fs.rename(oldPath, newPath, err => {
    err ? reject(err) : resolve()
  })
})


readdir(filePath).then(async components => {
  // 忽略_开头的文件夹和index.tsx
  const componentsDir = components.filter(component => !component.startsWith('_') && !component.includes('.'))
  componentsDir.forEach(dir => {
    // 入口文件
    !isIgnoreIndex && fs.existsSync(filePath + dir) && readdir(filePath + dir).then(files => {
      files.forEach(file => {
        let [fileName, midName, suffixName] = file.split('.')
        // index.zh-CN.md
        if (suffixName && midName.includes('-')) {
          // 设置默认后缀名
          suffixName = suffixName === 'md' ? (sufName || 'bak') : (sufName || 'md')
          const oldPath = filePath + dir + '/' + file
          const newPath = filePath + dir + `/${fileName}.${midName}.` + suffixName
          !isForce && keys.includes(dir) && ignoresMap[dir].includes('index') && ignoreSet.add(oldPath)
          !ignoreSet.has(oldPath) && rename(oldPath, newPath).then(() => console.log(`Successfully modified ${oldPath} -> ${newPath}`)).catch(e => console.log(e))
        }
      })
    })

    // demo 目录
    fs.existsSync(filePath + dir + '/demo/') && readdir(filePath + dir + '/demo/').then(files => {
      // 是否忽略 basic
      isIgnoreBasic === 'true' && ignoreSet.add(filePath + dir + '/demo/basic.md')
      files.forEach(file => {
        let [fileName, suffixName] = file.split('.')
        suffixName = suffixName === 'md' ? (sufName || 'bak') : (sufName || 'md')
        const oldPath = filePath + dir + '/demo/' + file
        const newPath = filePath + dir + '/demo/' + fileName + '.' + suffixName
        !isForce && keys.includes(dir) && keys.forEach(key => ignoresMap[key].includes(fileName) && ignoreSet.add(oldPath))
        !ignoreSet.has(oldPath) && rename(oldPath, newPath).then(() => console.log(`Successfully modified ${oldPath} -> ${newPath}`)).catch(e => console.log(e))
      })
    })
  })
})
