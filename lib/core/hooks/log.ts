import log4js from 'log4js';
import path from 'path';
import { DiudiuProcess } from '../types';
const dprocess = process as DiudiuProcess;

export default async (app) => {
  const logConfig = app.config?.log || {};
  const dir = logConfig?.dir;
  // logConfig 不为空，dir 必传
  if (Object.keys(logConfig).length !== 0 && !!dir) {
    log4js.configure({
      appenders: {
        out: { type: 'stdout' },
        access: {
          type: 'dateFile',
          filename: path.join(dir, 'access'),
          alwaysIncludePattern: true,
          pattern: 'yyyy-MM-dd-hh.log'
        },
        error: {
          type: 'dateFile',
          filename: path.join(dir, 'error'),
          alwaysIncludePattern: true,
          pattern: 'yyyy-MM-dd-hh.log'
        },
        application: {
          type: 'dateFile',
          filename: path.join(dir, 'application'),
          alwaysIncludePattern: true,
          pattern: 'yyyy-MM-dd-hh.log'
        }
      },
      categories: {
        default: { appenders: ['out'], level: 'info' },
        access: { appenders: ['access'], level: 'info' },
        error: { appenders: ['error'], level: 'error' },
        application: { appenders: ['application'], level: 'info' }
      }
    });

    process.on('access', (msg) => {
      const accessLog = log4js.getLogger('access');
      accessLog.info(msg);
    })
    process.on('error', (msg) => {
      const errorLog = log4js.getLogger('error');
      errorLog.error(msg);
    })
    process.on('application', (msg) => {
      const applicationLog = log4js.getLogger('application');
      applicationLog.info(msg);
    })
    app.use((ctx, next) => {
      // 记录access日志
      dprocess.emit('access', JSON.stringify(ctx));

      // 在ctx上挂载用户自定义日志
      ctx.log = (...arg) => {
        dprocess.emit('application', arg);
      }

      // ctx上挂载error日志
      ctx.error = (...arg) => {
        dprocess.emit('error', arg);
      }
      return next();
    })
  }
}
