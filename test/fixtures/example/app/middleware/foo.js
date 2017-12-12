'use strict';

module.exports = () => {
  return async (ctx, next) => {
    ctx.set('foo', 'bar');
    return await next();
  };
};
