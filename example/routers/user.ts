import Router from 'koa-router';
const router = new Router()
router.prefix('/user')
router.get('/getinfo', (ctx, next)=>{
    console.log('===')
    ctx.body = "my name is liujianghong."
})
export default router;
