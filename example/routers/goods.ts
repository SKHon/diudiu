import Router from 'koa-router';
const router = new Router()
router.prefix('/goods')
router.get('/getinfo', (ctx, next)=>{
    ctx.body = "this is koa book."
})
export default router;