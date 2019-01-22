import { Router, Context } from 'egg';
import { IMiddleware } from 'koa-router'

interface RouterPlus extends Router {
  namespace(prefix: string, ...middlewares: IMiddleware<any, Context>[]): Router;
}
 
declare module 'egg' {
  interface Application {
    router: RouterPlus;
  }
}
