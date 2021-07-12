'use strict';

module.exports = options => {
  return async (ctx, next) => {
    if (ctx.times === undefined) ctx.times = 0;
    ctx.set('x-router', options.prefix);
    ctx.set('x-times', ++ctx.times);
    return await next();
  };
};
