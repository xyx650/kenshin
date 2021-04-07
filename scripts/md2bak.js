/****************
 * 忽略清单
 ****************/
const ignoresMap = {
  button: ['index'],
  card: []
}



const fs = require('fs')
let args = process.argv.slice(2)
const filePath = './components/'

let argsStr = args.join(',')
const isForce = argsStr.indexOf('!') !== -1
argsStr = argsStr.replace('!', '')

const isIgnoreIndex = argsStr.indexOf('+') === -1 && !isForce
argsStr = argsStr.replace('+', '')
args = argsStr.split(',')

const index = args.findIndex(i => i === 'true' || i === 'false')
const isIgnoreBasic = index > -1 ? String(args.splice(index, 1)) : 'true'
let sufName = args.find(s => s !== 'true' || s !== 'false')

const keys = Object.keys(ignoresMap)
const ignoreList = []
fs.readdir(filePath, (err, components) => {
  !err && components.forEach(component => {

    !component.includes('.') && fs.readdir(filePath + component + '/demo/', (err, files) => {
      isIgnoreBasic === 'true' && ignoreList.push(filePath + component + '/demo/basic.md')
      !err && files.forEach(file => {
        let [fileName, suffixName] = file.split('.')
        suffixName = suffixName === 'md' ? (sufName || 'bak') : (sufName || 'md')
        const oldPath = filePath + component + '/demo/' + file
        const newPath = filePath + component + '/demo/' + fileName + '.' + suffixName
        !isForce && keys.includes(component) && keys.forEach(key => ignoresMap[key].includes(fileName) && ignoreList.push(oldPath))
        !ignoreList.includes(oldPath) && fs.rename(oldPath, newPath, error => {
          !error && console.log('成功修改' + oldPath)
          error && console.log(error)
        })
      })
    })

    if (!isIgnoreIndex) {
      !component.includes('.') && fs.readdir(filePath + component, (err, files) => {
        !err && files.forEach(file => {
          if (file.indexOf('index.zh-CN') !== -1 || file.indexOf('index.en-US') !== -1) {
            let [fileName, midName, suffixName] = file.split('.')
            suffixName = suffixName === 'md' ? (sufName || 'bak') : (sufName || 'md')
            const oldPath = filePath + component + '/' + file
            const newPath = filePath + component + `/${fileName}.${midName}.` + suffixName
            !isForce && keys.includes(component) && keys.forEach(key => ignoresMap[key].includes('index') && ignoreList.push(oldPath))
            !ignoreList.includes(oldPath) && fs.rename(oldPath, newPath, error => {
              !error && console.log('成功修改' + oldPath)
              error && console.log(error)
            })
          }
        })
      })
    }
  })
})
