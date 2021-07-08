'use strict';

const is = require('is-type-of');
const assert = require('assert');
const methods = [ 'head', 'options', 'get', 'put', 'patch', 'post', 'delete', 'del', 'all', 'resources' ];
const Router = require('@eggjs/router').EggRouter;

class RouterPlus {
  constructor(app) {
    this.app = app;
    this.routers = [ app.router ];
  }

  /**
   * get sub router
   *
   * @method Router#namespace
   * @param {String} prefix - sub router prefix
   * @param {...Function} [middlewares] - optional middlewares
   * @return {Router} Return sub router with special prefix
   */

  namespace(prefix, ...middlewares) {
    assert(is.string(prefix), `only support prefix with string, but got ${prefix}`);
    assert(prefix !== '/', 'namespace / is not supported');

    // use different router instance to seperate sub router
    const router = new Router({ sensitive: true }, this.app);
    this.routers.push(router);
    // register router middleware
    this.app.beforeStart(() => {
      this.app.use((ctx, next) => {
        if (!ctx.path.startsWith(prefix)) return next();
        return router.middleware()(ctx, next);
      });
    });

    const fnCache = {};
    // mock router
    const proxy = new Proxy(router, {
      get(target, property) {
        if (methods.includes(property)) {
          if (!fnCache[property]) {
            fnCache[property] = proxyFn(target, property, prefix, middlewares, proxy);
          }
          return fnCache[property];
        }
        return target[property];
      },
    });

    return proxy;
  }

  url(name, params) {
    let res;
    for (const router of this.routers) {
      res = router.url(name, params);
      if (res) return res;
    }
    return res;
  }
}

module.exports = RouterPlus;

function proxyFn(target, property, prefix, middlewares, routerProxy) {
  const fn = target[property];
  const proxy = new Proxy(fn, {
    apply(targetFn, ctx, args) {
      if (args.length >= 3 && (is.string(args[1]) || is.regExp(args[1]))) {
        // app.get(name, url, [...middleware], controller)
        args[1] = addPrefix(prefix, args[1]);
        args.splice(2, 0, ...middlewares);
      } else {
        // app.get(url, [...middleware], controller)
        args[0] = addPrefix(prefix, args[0]);
        args.splice(1, 0, ...middlewares);
      }
      Reflect.apply(targetFn, ctx, args);
      return routerProxy;
    },
  });
  return proxy;
}

function addPrefix(prefix, path) {
  assert(is.string(path), `only support path with string, but got ${path}`);
  return prefix + path;
}
