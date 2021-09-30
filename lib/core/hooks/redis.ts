import Redis from 'ioredis';
export default async (app) => { 
  const redisConfig = app.config.redis;
  try {
    const redis = new Redis(redisConfig);
    const c = { cyan: '\x1b[36m', red: '\x1b[31m', end: '\x1b[39m' }
    app.redisConMsg = `redis connect success. host: ${c.cyan}${redisConfig.host}${c.end}, port: ${c.cyan}${redisConfig.port}${c.end}`;
    app.use((ctx, next) => {
      ctx.redis = redis;
      return next();
    })
  } catch (error) {
    process.emit('error', error);
  }
  
}
