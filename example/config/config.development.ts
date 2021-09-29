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
    middlewares: ['two', 'one']
  }
}