export default async (app) => {
  // 如果没传port，默认为8888
  const port = app.config?.devServer?.port || 8888;
  app.listen(port, () => {
    prointLogo()
    log(`Server port ${c.cyan}${port}${c.end}`)
    log(`Server lifted in ${c.cyan}${app.appPath}${c.end}`)
    app.redisConMsg && log(app.redisConMsg)
    app.mysqlConMsg && log(app.mysqlConMsg)
    app.esConMsg && log(app.esConMsg)
    log('To shut down, press <CTRL> + C at any time.\n')
  })
}

const log = message => process.stdout.write(message + '\n')
const c = { cyan: '\x1b[36m', red: '\x1b[31m', end: '\x1b[39m' }
const prointLogo = () => log(`${c.cyan}
   _ _ _ _     _ _ _ _      _       _ 
  | |   | |   |__   __|    | |     | |
  | |   | |      | |       | |     | |
  | |  | |     __| |__     | |_ _ _| |
  | | / /     |_ _ _ _|    |_ _ _ _ _|
${c.end}`)