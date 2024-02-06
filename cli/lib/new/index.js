const path = require('path')
const fs = require('fs')
const cp = require('child_process');

const {
  mkdirpSync,
  walkFile,
  writeFileWithTemplate,
  tree
} = require('../utils')

const needToCompile = ['.ts', '.json', '.md', '.js']
const needToRename = {
  '_.gitignore': '.gitignore',
  'gitignore': '.gitignore',
}
const defaultRegistry = 'https://registry.npmjs.org/'

module.exports = (targetPath, name) => {

  const templateDirPath = path.join(__dirname, 'template')
  const projectPath = path.join(targetPath, name)

  if (fs.existsSync(projectPath) && name !== '.') {
    return Promise.reject([`${projectPath} is existed.`])
  }
  let coreVersion = '0.0.1';
  try {
    coreVersion = cp.execSync('npm view diudiu-core version').toString().trim();
  } catch (error) {
    console.log(`Status Code: ${error.status} with '${error.message}'`);
  }

  walkFile(templateDirPath, (filePath, type) => {
    const relativePath = path.relative(templateDirPath, filePath)
    const target = path.join(targetPath, name, relativePath)
    const { ext, base, dir } = path.parse(target)

    mkdirpSync(path.dirname(target))

    const data = needToCompile.indexOf(ext.toLowerCase()) === -1 ? null : {
      name: name === '.' ? 'diudiu-app' : name,
      coreVersion: coreVersion
    }
    const renameTarget = needToRename[base] ? path.join(dir, needToRename[base]) : target
    writeFileWithTemplate(renameTarget, filePath, data)
  })

  name !== '.' && console.log('\n' + tree(projectPath).split('\n').map(line => '  ' + line).join('\n'))

  return Promise.resolve([
    `Rroject generated at ${projectPath}\n`,
    'Run the following command to install',
    `> cd ${name} && npm i --registry=${defaultRegistry}\n`,
    'Then run Run the following command to lift',
    '> npm run dev\n'
  ])
}