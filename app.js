'use strict';

const path = require('path');
const Router = require('./lib/router');

module.exports = app => {
  const router = new Router(app);

  /**
   * get sub router
   *
   * @function Router#namespace
   * @param {String} prefix - sub router prefix
   * @param {...Function} [middlewares] - optional middlewares
   * @return {Router} Return sub router with special prefix
   */
  const rootRouter = router.namespace('');
  Object.defineProperty(app, 'router', {
    get() {
      return rootRouter;
    },
  });
  app.router.namespace = (...args) => {
    return router.namespace(...args);
  };
  app.url = router.url.bind(router);

  // patch loadRouter
  // load sub routers first
  const loadRouter = app.loader.loadRouter;
  app.loader.loadRouter = function() {
    new app.loader.FileLoader({
      directory: path.join(app.baseDir, 'app/router'),
      target: {},
      inject: app,
      call: true,
    }).load();
    loadRouter.call(app.loader);
  };
};
