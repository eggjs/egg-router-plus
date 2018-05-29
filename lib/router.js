'use strict';

const is = require('is-type-of');
const assert = require('assert');
const methods = [ 'head', 'options', 'get', 'put', 'patch', 'post', 'delete', 'del', 'all', 'resources' ];

class RouterPlus {
  constructor(app) {
    this.app = app;
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

    const fnCache = {};
    // mock router
    const proxy = new Proxy(this.app.router, {
      get(target, property) {
        if (methods.includes(property)) {
          if (!fnCache[property]) {
            fnCache[property] = proxyFn(target, property, prefix, middlewares);
          }
          return fnCache[property];
        }
        return target[property];
      },
    });

    return proxy;
  }
}

module.exports = RouterPlus;

function proxyFn(target, property, prefix, middlewares) {
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
      return Reflect.apply(targetFn, ctx, args);
    },
  });
  return proxy;
}

function addPrefix(prefix, path) {
  assert(is.string(path), `only support path with string, but got ${path}`);
  return prefix + path;
}
