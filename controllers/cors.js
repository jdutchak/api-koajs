/**
 * CORS Controller
 **/
const config = require('../controllers/config');

module.exports = async (ctx, next) => {
  const origin = ctx.request.headers.origin;

  if(config.ORIGIN_ACCESS.indexOf(origin) > -1) {
    ctx.set("Access-Control-Allow-Origin", origin);
  }

  ctx.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  ctx.set("Access-Control-Allow-Headers", "Origin, Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  ctx.set("Access-Control-Allow-Credentials", true);

  if ('OPTIONS' === ctx.method) {
    ctx.body = { statusCode: 200 };
  }

  await next();
};
