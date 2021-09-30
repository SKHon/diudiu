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
    middlewares: ['two', 'one'],
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

    // ioredis 配置
    redis: {
      port: 6379, 
      host: "127.0.0.1", 
      password: "",
    },
    mysql: {
      host: 'localhost',
      user: 'root',
      password: '123456',
      database: 'koadb'
    },
    elasticsearch: {
      host: 'localhost:9200'
    }
  }
}