export default (app) => {
  return (ctx, next) => {
    console.log('111')
    return next()
  }
}