/**
 * Index Routes
 **/

module.exports = (router) => {

  router.prefix('/api');

  require('./auth')(router, '/auth');
  require('./default')(router);
  require('./user')(router, '/user');

};

