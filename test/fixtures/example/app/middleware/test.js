'use strict';

module.exports = options => {
  return async (ctx, next) => {
    ctx.set('x-router', options.prefix);
    return await next();
  };
};
