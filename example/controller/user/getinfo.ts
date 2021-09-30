export default {
  method: 'GET',
  handler: async (ctx) => {
    ctx.log('liujianghong', 'age');
    ctx.error('aaaa')
    await ctx.render('404', {
      url: 'https://baidu.com',
    })
  }    
}