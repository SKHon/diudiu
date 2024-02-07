import path from 'path';
export default app => {
  return {
    router: 'file',
    devServer: {
      port: 8888
    },
    cors: {
      allowMethods: 'POST',
      maxAge: 0
    },
    // 自定义中间件配置
    middlewares: ['two', 'one'],
    // 登录模块配置
    login: {
      needLogin: true,
      secret: 'my_secret',
      cookieOption: {


      }
    },
    // koa-view模版配置
    view: {
      extension: 'ejs'
    },

    // koa-bodyparser配置
    bodyparser: {

    },

    // koa-static配置
    static: {

    },

    log: {
      dir: path.join(__dirname, '../log')
    },

    // mock配置
    // mock: {
    //   prefix: '', // api前缀
    // },

    // ioredis 配置，使用之前，需要开启redis-server
    // redis: {
    //   port: 6379,
    //   host: "127.0.0.1",
    //   password: "",
    // },

    // 注释mysql, 若需使用, 请启动mysql, 并配置相关mysql信息
    // mysql: {
    //   host: 'localhost',
    //   user: 'root',
    //   password: '123456',
    //   database: 'koadb'
    // },

    // elasticsearch: {
    //   node: 'localhost:9200'
    // }

    // xprofiler: {
    //   log_dir: 'xprofiler'
    // }
  }
}