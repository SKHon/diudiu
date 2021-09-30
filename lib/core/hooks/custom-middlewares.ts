
import path from 'path';

export default async (app) => { 
  const { middlewares } = app.config;
 
  // 按照middleWares数组的顺序加载中间件
  for (let m of middlewares) {
    const curMiddleWarePath = path.resolve(app.appPath, './middleware', `${m}${app.extName}`)
    const curMiddleware = await import(curMiddleWarePath);
    app.use(curMiddleware.default(app))
  }
  
}