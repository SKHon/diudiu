export default {
  method: 'POST',
  handler: async (ctx) => {
    console.log(ctx.request.body)
    await ctx.render('404', {
      url: 'https://baidu.com',
    })
  }    
}