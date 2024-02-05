module.exports = {
  getAppPath,
  mkdirpSync,
  walkFile,
  writeFileWithTemplate,
  pkgRaw,
  tree,
  versionCompare
}

const path = require('path')
const fs = require('fs')
const ejs = require('ejs')
const http = require('http')
const https = require('https')
const url = require('url')

const ignoreFiles = ['.DS_Store']

function mkdirpSync (dirPath) {
  if ( !path.isAbsolute(dirPath) )
    throw new Error('参数必须是绝对路径')

  if ( fs.existsSync(dirPath) ) {
    if (fs.statSync(dirPath).isDirectory()) return
    throw new Error(`${dirPath} 已经存在，且不是文件夹`)
  }
  mkdirpSync( path.dirname(dirPath) )
  fs.mkdirSync(dirPath, '777')
}

function writeFileWithTemplate (filePath, templatePath, data) {

  if ( !path.isAbsolute(templatePath) )
    throw new Error('参数必须是绝对路径')

  if (data) {
    const file = fs.readFileSync(templatePath, 'utf8')
    const content = ejs.compile(String(file))(data)
    fs.writeFileSync(filePath, content, 'utf8')
  } else {
    fs.createReadStream(templatePath).pipe( fs.createWriteStream(filePath) )
  }
}

function walkFile (dirPath, callback) {

  let stat
  try { stat = fs.statSync(dirPath) } catch (e) { return }
  if (!stat.isDirectory()) return

  fs.readdirSync(dirPath).forEach(file => {

    if (ignoreFiles.indexOf(file) >= 0) return

    const filePath = path.join(dirPath, file)
    const stat = fs.statSync(filePath)

    if (stat.isFile()) callback(filePath)
    if (stat.isDirectory()) walkFile(filePath, callback)
  })
}


function getAppPath () {
  let appPath = process.cwd()

  while (appPath != '/') {
    if (fs.existsSync(path.join(appPath, 'package.json'))) {
      return appPath
    }
    appPath = path.dirname(appPath)
  }
  return null
}


function pkgRaw (name, registry='https://registry.npmjs.org/') {

  const fn = ({ http, https })[registry.split('://')[0]]

  if (!fn) return Promise.reject(new Error('registry need to be a url.'))

  return new Promise((resolve, reject) => {
    const req = fn.request(url.resolve(registry, name), res => {
      let content = ''
      res.setEncoding('utf8')
      res.on( 'data', chunk => content += chunk )
      res.on( 'end', _ => resolve(JSON.parse(content)) )
      res.on( 'error', error => reject(error) )
    })
    req.on('socket', function (socket) {
      socket.setTimeout(1000)
      socket.on('timeout', _ => req.abort())
    })
    req.on('error', error => {
      const message = error.code === 'ECONNRESET' ?
        `\n  connect to registry ${registry} failed` : error
      reject(message)
    })
    req.end()
  })
}


function tree (directory) {

  let output = [path.basename(directory)]
  readDirectory(output, directory || '.')
  output = output.join('\n')

  return output

  function indent (tails) {
    let result = ''
    tails.forEach(tail => result += tail ? '│  ' : '   ')
    return result
  }

  function readDirectory (output, dir, tails) {
    tails = tails || []

    let files = fs.readdirSync(dir),
      prefix = indent(tails) + '├── ',
      tailPrefix = prefix.replace('├── ', '└── '),
      i = 0,
      n = files.length,
      filePath, stat, newTails

    for (; i < n; i++) {
      filePath = path.join(dir, files[i])
      stat = fs.statSync(filePath)
      output.push((i === n - 1 ? tailPrefix : prefix) + files[i])

      if (stat.isDirectory()) {
        newTails = tails.slice()
        newTails.splice(newTails.length, 0, i !== n - 1)
        readDirectory(output, filePath, newTails)
      }
    }
  }
}

function versionCompare (version1, operater, version2) {

  version1 = version1.split('.').map(number => number | 0)
  version2 = version2.split('.').map(number => number | 0)

  const length = Math.max(version1.length, version2.length)

  let result = '='
  for (let index = 0; index < length; index++) {
    const value1 = version1[index] | 0
    const value2 = version2[index] | 0
    const _value = value1 - value2
    if (_value !== 0) {
      result = _value > 0 ? '>' : '<'
      break
    }
  }

  return operater.indexOf(result) !== -1
}