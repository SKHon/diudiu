import elasticsearch from '@elastic/elasticsearch';
import { DiudiuProcess } from '../types';
const dprocess = process as DiudiuProcess;
export default async (app) => {
  const esConfig = app.config?.elasticsearch || {};
  // 如果esConfig为空，则不执行这里的代码
  if (Object.keys(esConfig).length !== 0) {
    let client = new elasticsearch.Client(esConfig);
    const c = { cyan: '\x1b[36m', red: '\x1b[31m', end: '\x1b[39m' };
    try {
      await client.ping({}, {
        requestTimeout: 1000
      })
      app.use((ctx, next) => {
        ctx.elasticsearch = client;
        return next()
      })
      app.esConMsg = `elasticsearch connect success. host: ${c.cyan}${esConfig.host}${c.end}`
    } catch (error) {
      dprocess.emit('error', error);
    }
  }

}
