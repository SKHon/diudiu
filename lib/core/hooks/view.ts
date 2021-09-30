import views from 'koa-views';
import path from 'path';
const defaultViewConfig = {
  extension: 'ejs' 
}
export default async (app) => { 
  const viewConfig = app.config.view;
  app.use(views(path.join(app.appPath, './view'), Object.assign(defaultViewConfig, viewConfig)))
}

