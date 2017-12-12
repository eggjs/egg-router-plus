'use strict';

module.exports = app => {
  const { router, controller } = app;

  router.get('/sub', controller.home.index);
};
