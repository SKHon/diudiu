export default async (app) => { 
  const port = app.config.devServer.port;
  app.listen(port, () => {
    prointLogo()
    log(`Server port ${c.cyan}${port}${c.end}`)
    log(`Server lifted in ${c.cyan}${app.appPath}${c.end}`)
    log('To shut down, press <CTRL> + C at any time.\n')
  })
}

const log = message => process.stdout.write(message + '\n')
const c = { cyan: '\x1b[36m', red: '\x1b[31m', end: '\x1b[39m' }
const prointLogo = () => log(`
   _ _ _ _     _ _ _ _      _       _ 
  | |   | |   |__   __|    | |     | |
  | |   | |      | |       | |     | |
  | |  | |     __| |__     | |_ _ _| |
  | | / /     |_ _ _ _|    |_ _ _ _ _|
`)