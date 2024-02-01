import Redis from 'ioredis';
import { DiudiuProcess } from '../types';
const dprocess = process as DiudiuProcess;
export default async (app) => {
  const redisConfig = app.config?.redis;

  // redis没有超时概念，如果没有相关配置，就不进行初始化
  if (redisConfig) {
    const redisConfig = app.config?.redis || {};
    redisConfig.port = redisConfig?.port || 6379;
    redisConfig.host = redisConfig?.host || "127.0.0.1";
    redisConfig.password = redisConfig?.password || "";
    try {
      const redis = new Redis(redisConfig);
      const c = { cyan: '\x1b[36m', red: '\x1b[31m', end: '\x1b[39m' };
      app.redisConMsg = `redis connect success. host: ${c.cyan}${redisConfig.host}${c.end}, port: ${c.cyan}${redisConfig.port}${c.end}`;
      app.use((ctx, next) => {
        ctx.redis = redis;
        return next();
      })
    } catch (error) {
      dprocess.emit('error', error);
    }
  }
}
