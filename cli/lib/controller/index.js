const path = require('path')
const fs = require('fs')

const {
  mkdirpSync,
  writeFileWithTemplate
} = require('../utils')

module.exports = (appPath, targetPath) => {

  const route = path.join('/', targetPath)

  const actionPath = path.join(appPath, 'controller/')
  targetPath = path.join(actionPath, targetPath)

  if (targetPath[targetPath.length - 1] === '/') {
    targetPath = path.join(targetPath, 'index.ts')
  } else {
    const {dir, name} = path.parse(targetPath)
    targetPath = path.join(dir, name + '.ts')
  }

  if ( !fs.existsSync(targetPath) ) {

    mkdirpSync(path.dirname(targetPath))

    writeFileWithTemplate(
      targetPath,
      path.join(__dirname, 'template/controller.js'),
      {
        route: route,
        createdAt: Date().toString()
      }
    )
    return Promise.resolve([`Controller generated at ${targetPath}`])
  }
  return Promise.reject([`${targetPath} is existed.`])
}