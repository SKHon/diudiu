import mysql from 'mysql2';
import { DiudiuProcess } from '../types';
const dprocess = process as DiudiuProcess;
export default async (app) => {
  const mysqlConfig = app.config?.mysql || {};
  // mysql的基本设置 host、user、password、database 
  if (mysqlConfig?.host && mysqlConfig?.user && mysqlConfig?.password && mysqlConfig?.database) {
    try {
      const connection = mysql.createConnection(mysqlConfig);
      connection.connect();
      const c = { cyan: '\x1b[36m', red: '\x1b[31m', end: '\x1b[39m' }
      app.mysqlConMsg = `mysql connect success. host: ${c.cyan}${mysqlConfig.host}${c.end}`
      app.use((ctx, next) => {
        ctx.mysql = connection;
        return next()
      })
    } catch (error) {
      dprocess.emit('error', error);
    }
  }
}
