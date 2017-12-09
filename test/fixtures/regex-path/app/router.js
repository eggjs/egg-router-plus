'use strict';

module.exports = app => {
  const subRouter = app.getRouter('/sub');
  subRouter.get(/.*/, async ctx => {
    ctx.body = 'bad';
  });
};
