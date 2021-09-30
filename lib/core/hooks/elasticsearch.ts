import elasticsearch from 'elasticsearch';
export default async (app) => { 
  const esConfig = app.config.elasticsearch;
  let client = new elasticsearch.Client(esConfig);
  const c = { cyan: '\x1b[36m', red: '\x1b[31m', end: '\x1b[39m' };
  try {
    await client.ping({
      requestTimeout: 1000
    })
    app.use((ctx, next) => {
      ctx.elasticsearch = client;
      return next()
    })
    app.esConMsg = `elasticsearch connect success. host: ${c.cyan}${esConfig.host}${c.end}`
  } catch (error) {
    process.emit('error', error);
  }
}
