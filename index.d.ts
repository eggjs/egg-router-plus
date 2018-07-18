import { Router, Context } from 'egg';

interface RouterPlus extends Router {
  namespace(prefix: string, ...middlewares: ((ctx: Context, next: () => Promise<any>) => any)[]): Router;
}
 
declare module 'egg' {
  interface Application {
    router: RouterPlus;
  }
}
