import { Router, Context } from 'egg';
import { IMiddleware } from 'koa-router'

interface RouterPlus extends Router {
  namespace(prefix: string, ...middlewares: (((ctx: Context, next: () => Promise<any>) => any) | IMiddleware)[]): Router;
}
 
declare module 'egg' {
  interface Application {
    router: RouterPlus;
  }
}
