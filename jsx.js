const fs = require('fs')

const filePath = './components/'
const replaceDir = process.argv[3] || ''

const readdir = path => new Promise((resolve, reject) => fs.readdir(path, (err, files) => err ? reject(err) : resolve(files)))
const readFile = path => new Promise((resolve, reject) => fs.readFile(path, (err, data) => err ? reject(err) : resolve(data.toString())))
const writeFile = (path, data) => new Promise((resolve, reject) => fs.writeFile(path, data, (err) => err ? reject(err) : resolve()))


readdir(filePath).then(dirs => {
  dirs.forEach(dir => {
    const demo = filePath + dir + '/demo/'
    replaceDir && replaceDir === dir && fs.existsSync(demo) && readdir(demo).then(files => {
      files.forEach(file => {
        readFile(demo + file).then(data => {
          data = data.replace(/(import {[\s\S]*} from )'(\w+)'/, (_, front, moduleName) => `${front}'${process.argv[2] || moduleName}'`)
          writeFile(demo + file, data).then(() => console.log(`Successfully written to file ${demo +
          file}`)).catch(e => console.log(e))
        })
      })
    })
  })
})
