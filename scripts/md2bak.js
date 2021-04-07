const fs = require('fs')
const args = process.argv.slice(2)
const filePath = './components/'

// 忽略清单
const ignoresMap = {
  button: [],
  card: []
}

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
        keys.includes(component) && keys.forEach(key => ignoresMap[key].includes(fileName) && ignoreList.push(oldPath))
        !ignoreList.includes(oldPath) && fs.rename(oldPath, newPath, error => {
          !error && console.log('成功修改' + oldPath)
          error && console.log(error)
        })
      })
    })

    !component.includes('.') && fs.readdir(filePath + component, (err, files) => {
      !err && files.forEach(file => {
        if (file.indexOf('index.zh-CN') != -1) {
          let suffixName = file.split('.')[2]
          suffixName = suffixName === 'md' ? (sufName || 'bak') : (sufName || 'md')
          const oldPath = filePath + component + '/' + file
          const newPath = filePath + component + '/index.zh-CN.' + suffixName
          keys.includes(component) && keys.forEach(key => ignoresMap[key].includes('index') && ignoreList.push(oldPath))
          !ignoreList.includes(oldPath) && fs.rename(oldPath, newPath, error => {
            !error && console.log('成功修改' + oldPath)
            error && console.log(error)
          })
        }
      })
    })
  })
})
