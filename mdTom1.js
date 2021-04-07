const fs = require('fs')
const path = require('path')

const filePath = './components/'

fs.readdir(filePath, (err, components) => {
  !err && components.forEach(component => {
    if (!component.includes('.')) {
      fs.readdir(filePath + component + '/', (err, folders) => {
        !err && folders.forEach(folder => {
          if (folder === 'demo') {
            const f = filePath + component + '/' + folder + '/'
            fs.readdir(f, (err, mds) => {
              !err && mds.forEach(md => {
                const [fileName] = md.split('.')
                const oldPath = filePath + component + '/' + folder + '/' + md
                const newPath = filePath + component + '/' + folder + '/' + fileName + '.md'
                if (fileName !== 'basic') {
                  fs.rename(oldPath, newPath, error => {
                    !error && console.log('成功修改' + oldPath)
                    error && console.log(error)
                  })
                }
              })
            })
          }
        })
      })
    }
  })
})
