import bodyParser from 'koa-bodyparser';
export default async (app) => { 
  const bodyparserConfig = app.config.bodyparser;
  app.use(bodyParser(bodyparserConfig));
  
}
