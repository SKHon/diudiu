export default {
  method: 'GET',
  handler: async (ctx) => {
    const result = await ctx.proxy('https://registry.npmjs.com/diudiu/latest');

    ctx.body = result;
  }    
}