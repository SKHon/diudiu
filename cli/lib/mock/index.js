const path = require('path')
const fs = require('fs')

const {
  mkdirpSync,
  writeFileWithTemplate
} = require('../utils')

module.exports = (appPath, targetPath) => {

  const route = path.join('/', targetPath)

  const actionPath = path.join(appPath, 'mock/')
  
  if (targetPath.includes('/')) {
    return Promise.reject([`${targetPath} must is one file`])
  }

  targetPath = path.join(actionPath, targetPath)
  
  const {dir, name} = path.parse(targetPath)
  targetPath = path.join(dir, name + '.ts')

  if ( !fs.existsSync(targetPath) ) {

    mkdirpSync(path.dirname(targetPath))

    writeFileWithTemplate(
      targetPath,
      path.join(__dirname, 'template/mock.js'),
      {
        route: route,
        createdAt: Date().toString()
      }
    )
    return Promise.resolve([`mock generated at ${targetPath}`])
  }
  return Promise.reject([`${targetPath} is existed.`])
}