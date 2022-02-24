import Router from 'koa-router';
const router = new Router()
router.prefix('/product')
router.post('/getinfo', (ctx, next) => {
  console.log(ctx.request.body)
  ctx.body = `my name is ${ctx.req.body.name}.`
})
export default router;
