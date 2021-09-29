export default (app) => {
  return (ctx, next) => {
    console.log('222')
    return next()
  }
}