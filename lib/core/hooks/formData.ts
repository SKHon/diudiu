import multer from 'koa-multer';

const formDataParser = multer().any()
export default async (app) => {
  app.use(formDataParser);
}
