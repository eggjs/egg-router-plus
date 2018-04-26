'use strict';

const is = require('is-type-of');
const assert = require('assert');
const methods = [ 'head', 'options', 'get', 'put', 'patch', 'post', 'delete', 'del', 'all', 'resources' ];

class RouterPlus {
  constructor(app) {
    this.app = app;
    this.routerCache = {};
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

    if (!this.routerCache[prefix]) {
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
      this.routerCache[prefix] = proxy;
    }
    return this.routerCache[prefix];
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
  assert(is.string(path) || is.regExp(path), `only support path with string or RegExp, but got ${path}`);
  if (is.string(path)) {
    return prefix + path;
  }
  return getRegExp(prefix, path);

}

// when the path is a RegExp, concat prefix and path to be a new RegExp
function getRegExp(prefix, path) {
  // move '^' to the start of the final RegExp
  return new RegExp(`^${prefix}${path.source.replace('^', '')}`);
}
