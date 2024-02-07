import Koa from 'koa';
import path from 'path';
import { getHooks, deepMerge } from './utils'
import { Hook, App, DiudiuProcess } from './types';
const hooks = ['xprofiler', 'formData', 'log', 'proxy', 'mock', 'redis', 'mysql', 'elasticsearch', 'static', 'view', 'bodyparser', 'login', 'custom-middlewares', 'cors', 'router', 'lift'];

type Params = {
  appPath: string;
}

const dprocess = process as DiudiuProcess;

export default async function Diudiu(params: Params) {
  const app: App = (new Koa()) as App;
  const { appPath } = params;
  app.appPath = appPath;

  // 获取所有的config
  const env = process.env.NODE_ENV;
  const extName = app.extName = env === 'development' ? '.ts' : '.js';
  const baseConfig = await import(path.join(appPath, `config/config.base${extName}`))
  const curConfig = await import(path.join(appPath, `config/config.${env}${extName}`));
  app.config = deepMerge(baseConfig.default(app), curConfig.default(app));
  const allHooks: Hook[] = await getHooks(hooks);
  for (const hook of allHooks) {
    try {
      await hook.default(app);
    } catch (error) {
      dprocess.emit("error", error)
    }
  }

  // 错误捕获
  app.on("error", error => {
    dprocess.emit("error", error)
  });
};