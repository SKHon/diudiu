import koaStatic from 'koa-static';
import path from 'path';

export default async (app) => { 
  const staticConfig = app.config.static;
  app.use(koaStatic(path.join(app.appPath, './static'), staticConfig))
}

