import glob from 'glob';
import path from 'path';

export default async (app) => {
  const mockConfig = app.config.mock || {};

  if (!!Object.keys(mockConfig).length) {
    // 匹配mock目录路径
    const mockPath = path.resolve(app.appPath, './mock', `*${app.extName}`);
    // mock映射表
    let mockMap = {};

    // 查找mock目录下的文件
    glob.sync(mockPath).forEach(async (path) => {
      // 获取mock文件内容
      const mock = await import(path);

      if (!Object.keys(mock.default).length) return;

      // mock格式支持对象、数组、函数
      Object.keys(mock.default).forEach((key) => {
        mockMap[key] = mock.default[key];
      });
    });

    app.use((ctx, next) => {
      const { method, path } = ctx;
      // 拼接mock的key
      const key = `${method} ${mockConfig.prefix}${path}`;

      // 如果匹配到，就返回对应api的mock数据
      if (mockMap[key]) {
        // 判断是否是函数，并且回调ctx对象
        if (typeof mockMap[key] === 'function') {
          ctx.body = mockMap[key](ctx);
          return;
        }
        ctx.body = mockMap[key];
        return;
      }
      return next();
    });
  }
}
