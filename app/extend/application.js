'use strict';

const is = require('is-type-of');
const routerMap = {};

const methods = [
  'head', 'options', 'get', 'put', 'patch', 'post', 'delete',
  'all', 'resources', 'redirect',
];

module.exports = {
  getRouter(prefix, ...middlewares) {
    if (is.regExp(prefix)) throw new Error(`got ${prefix}, but egg-router-plus don't support regex path yet.`);

    if (!routerMap[prefix]) {
      const fnProxyMap = {};
      // mock router
      const proxy = new Proxy(this.router, {
        get(target, property) {
          if (methods.includes(property)) {
            if (!fnProxyMap[property]) {
              fnProxyMap[property] = proxyFn(target[property], prefix, middlewares);
            }
            return fnProxyMap[property];
          }
          return target[property];
        },
      });
      routerMap[prefix] = proxy;
    }
    return routerMap[prefix];
  },
};

function proxyFn(fn, prefix, middlewares) {
  const proxy = new Proxy(fn, {
    apply(target, ctx, args) {
      if (args.length >= 3 && (is.string(args[1]) || is.regExp(args[1]))) {
        // app.get(name, url, [...middleware], controller)
        args[1] = addPrefix(prefix, args[1]);
        args.splice(2, 0, ...middlewares);
      } else {
        args[0] = addPrefix(prefix, args[0]);
        args.splice(1, 0, ...middlewares);
      }
      return Reflect.apply(target, ctx, args);
    },
  });
  return proxy;
}

function addPrefix(prefix, path) {
  if (is.regExp(path)) throw new Error(`got ${path}, but egg-router-plus don't support regex path yet.`);
  return prefix + path;
}
