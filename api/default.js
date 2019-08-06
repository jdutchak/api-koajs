/**
 * Default Routes
 **/

module.exports = (router) => {

  /**
   * @defaultRoute
   */

  router.get('/', async (ctx, next) => {
    ctx.body = { statusCode: 200, status: 'api online', timestamp: new Date().getTime()};
    await next();
  });

  router.post('/', async (ctx, next) => {
    ctx.body = { statusCode: 200, status: 'api online', timestamp: new Date().getTime() };
    await next();
  });

};
