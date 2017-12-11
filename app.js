'use strict';

const Router = require('./lib/router');

module.exports = app => {
  const router = new Router(app);

  /**
   * get sub router
   *
   * @method Router#namespace
   * @param {String} prefix - sub router prefix
   * @param {...Function} [middlewares] - optional middlewares
   * @return {Router} Return sub router with special prefix
   */
  app.router.namespace = (...args) => {
    return router.namespace(...args);
  };
};
