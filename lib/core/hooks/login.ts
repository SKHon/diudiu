import { sign, decode } from 'jsonwebtoken';
export default async (app) => { 
  const loginConfig = app.config.login;
  const { secret } = loginConfig;
  const { cookieOption } = loginConfig;
  
  if (loginConfig?.needLogin) {
    // 检测是否已经登录
    const checkLogin = (ctx, next) => {

      // 这里默认检测，如果用户名存在，就算通过
      const token = ctx.cookies.get('diudiu_token');
      if (!token) {
        // 如果没有token，则需要进行登录操作
        const jwt = login();
        ctx.cookies.set('diudiu_token', jwt, cookieOption);
        ctx.status = 302;
        ctx.redirect(ctx.url);
      } else {
        const user = decode(token);
        if (user) {
          ctx.user = user;
        }
      }
      return next()
    }

    // 这里对接各自公司内部的sso的login策略, 这里用jwt方式替换。
    const login = () => {
      const jwt = sign({ username: 'liujianghong' }, secret, { expiresIn: '1h' })
      return jwt;
    }
    app.use(checkLogin)
  }
}