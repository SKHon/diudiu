import Koa from 'koa';
import http from 'http';
import path from 'path';
import { getHooks, deepMerge } from './utils'
const hooks = ['lift'];

type Params = {
  appPath: string;
}

export default async function Diudiu(params: Params) {
  const app = new Koa();
  const { appPath } = params;
  app.appPath = appPath;

  // 获取所有的config
  const env = process.env.NODE_ENV;
  const extName = env === 'development' ? '.ts' : '.js';
  // console.log(path.join(appPath, `config/config.base${extName}`))
  const baseConfig = await import(path.join(appPath, `config/config.base${extName}`))
  const curConfig = await import(path.join(appPath, `config/config.${env}${extName}`));
  app.config = deepMerge(baseConfig.default(app), curConfig.default(app));
  // console.log(app.config)


  const allHooks = await getHooks(hooks);
  for ( const hook of allHooks ) {
    try {
      await hook.default(app);
    } catch (error) {
      
    }
  }
  // app.listen = (...args) => {
  //   const server = app.server = http.createServer(app.callback())
  //   return server.listen(...args)
  // }
};