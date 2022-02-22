import glob from 'glob';
import path from 'path';
import compose from 'koa-compose';

export default async (app) => {
  const { router } = app.config;
  const filesList = glob.sync(path.resolve(app.appPath, './controller', `**/*${app.extName}`))

  // 如果是文件路由类型
  if (router === 'file') {
    // 文件路由映射表
    let routerMap = {}
    for (let item of filesList) {
      // 解构的方式获取，当前文件导出对象中的method属性和handler属性
      const controller = await import(item);
      const { method, handler } = controller.default;

      // 获取和actions目录的相对路径，例如：goods/getInfo.js
      let relative = path.relative(`${app.appPath}/controller/`, item)
      // 获取当前操作系统的标识, windows:'win32', MacOS: 'darwin'
      const platform = process.platform;
      // 如果是windows系统: goods\getInfo.js  =>  goods/getInfo.js 
      platform === 'win32' ? (relative = relative.replace(/\\/g, '/')) : '';
      // 获取文件后缀.js
      const extname = path.extname(item)
      // 剔除后缀.js,并在前面加一个"/",例如：/goods/getInfo
      const fileRouter = '/' + relative.split(extname)[0]
      // 连接method，形成一个唯一请求，例如: _GET_/goods/getInfo
      const key = '_' + method + '_' + fileRouter
      // 保存在路由表里
      routerMap[key] = handler
    }


    app.use(async (ctx, next) => {
      const { path, method } = ctx
      // 构建和文件路由匹配的形式：_GET_路由
      const key = '_' + method + '_' + path

      // 如果匹配到，就执行对应到handler
      if (routerMap[key]) {
        await routerMap[key](ctx)
      } else {
        ctx.body = 'no this router'
      }
      return next()
    })
  } else { // 走koa-router类型
    const routerFiles = glob.sync(path.resolve(app.appPath, './routers', `**/*${app.extName}`));
    const registerRouter = async () => {
      let routers: any[] = [];
      for (let file of routerFiles) {
        const router = await import(file);
        routers.push(router.default.routes());
      }
      return compose(routers)
    }
    app.use(await registerRouter())
  }

}
