export default {
  method: 'GET',
  handler: async (ctx) => {
    await ctx.render('404', {
      url: 'https://baidu.com',
    })
  }
}