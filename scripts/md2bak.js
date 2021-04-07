const fs = require('fs')
const isIgnoreBasic = true // 是否忽略basic
// 忽略清单
const ignoresMap = {
  button: ['block', 'danger'],
}

const filePath = './components/'





const sufName = process.argv[2]
const keys = Object.keys(ignoresMap)
const ignoreList = []
fs.readdir(filePath, (err, components) => {
  !err && components.forEach(component => {
    !component.includes('.') && fs.readdir(filePath + component + '/demo/', (err, files) => {
      isIgnoreBasic && ignoreList.push(filePath + component + '/demo/basic.md')
      !err && files.forEach(file => {
        const [fileName] = file.split('.')
        const oldPath = filePath + component + '/demo/' + file
        const newPath = filePath + component + '/demo/' + fileName + '.' + sufName
        keys.includes(component) && ignoresMap[keys].includes(fileName) && ignoreList.push(oldPath)
        !ignoreList.includes(oldPath) && fs.rename(oldPath, newPath, error => {
          !error && console.log('成功修改' + oldPath)
          error && console.log(error)
        })
      })
    })
  })
})
