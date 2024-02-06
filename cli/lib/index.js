const path = require('path')
const cp = require('child_process')
const program = require('commander')
const inquirer = require('inquirer')
const checkVersion = require('./check-version')
const { getAppPath, versionCompare } = require('./utils')

const logo = () => {
  console.log(`
   _ _ _ _     _ _ _ _      _       _      _ _ _ _      _ _ _ _      _       _
  | _ _ _ |   |_ _ _ _|    | |     | |    | _ _ _ |    |_ _ _ _|    | |     | |
  | |   | |      | |       | |     | |    | |   | |       | |       | |     | |
  | |   | |      | |       | |     | |    | |   | |       | |       | |     | |
  | |  | |     __| |__     | |_ _ _| |    | |  | |      __| |__     | |_ _ _| |
  | | / /     |_ _ _ _|    |_ _ _ _ _|    | | / /      |_ _ _ _|    |_ _ _ _ _|
  
  `)
}

module.exports = function main (argv) {
  checkVersion().then(() => commands(argv))
}

function commands (argv) {
  let matched = false

  const logMessage = (messages) => {
    logo()
    console.log(messages.map(msg => '  ' + msg).join('\n') + '\n')
  }

  const ok = logMessage
  const fail = logMessage

  program
    .version(require('../package.json').version)
    .usage('<command> <arg> [options]')

  program
    .command('new <name>')
    .description('新建 diudiu 项目')
    .option('-f, --force', '强制创建')
    .action((name, cmd) => {
      matched = true
      // 当前目录创建
      name === '.' && !cmd.force
      ? inquirer.prompt([{
          type: 'confirm',
          name: 'cover',
          message: `继续执行会覆盖当前目录下同名文件，请确保无重名文件或当前为空`,
          default: true
        }]).then(an => {
          if (an.cover === true) {
            require('./new')(process.cwd(), name)
              .then(message => ok(message))
              .catch(message => fail(message))
          }
        }).catch(message => fail(message))
      : require('./new')(process.cwd(), name)
          .then(message => ok(message))
          .catch(message => fail(message))
    })
  
    program
      .command('controller <path>')
      .description('创建 diudiu-controller')
      .action((path) => {
        matched = true
        const appPath = getAppPath()
        if (appPath && checkAppPath(appPath) ) {
          require('./controller')(appPath, path)
            .then(message => ok(message))
            .catch(message => fail(message))
        }
      })

    program
      .command('mock <path>')
      .description('创建 diudiu mock')
      .action((path) => {
        matched = true
        const appPath = getAppPath()
        if (appPath && checkAppPath(appPath) ) {
          require('./mock')(appPath, path)
            .then(message => ok(message))
            .catch(message => fail(message))
        }
      })  

  program.parse(argv)

  if (matched !== true) {
    const appPath = getAppPath()
    if (appPath) checkAppPath(appPath)
    logo()
    program.help()
  }
}

function checkAppPath (appPath) {
  if (!appPath) return notFound()
  const pkg = require(path.join(appPath, 'package.json'))
  const coreVersion = pkg.dependencies['diudiu-core']

  try {
    // 获取线上"diudiu-core"最新版本
    const needCoreVersion = cp.execSync('npm view diudiu-core version').toString();
    if (!coreVersion) return noDiudiu()
    if (versionCompare(coreVersion, '<', needCoreVersion)) {
      console.log('\n  ' +
        `New version of diudiu-core available ${coreVersion} -> ${needCoreVersion}\n  ` +
        `Please upgrade diudiu-core's version in "package.json" file and reinstall`
      )
    }
    return true

    function notFound () {
      console.log('\n  not found package.json')
    }

    function noDiudiu () {
      console.log('\n  not found application base on diudiu-core')
    }
    
  } catch (error) {
    console.log(`Status Code: ${error.status} with '${error.message}'`);
  }
  
}