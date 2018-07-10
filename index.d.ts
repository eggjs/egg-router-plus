import { Router } from 'egg';
interface RouterPlus extends Router {
    namespace(prefix: string, ...middlewares: Function[]):Router
}

declare module 'egg' {
    interface Application {
        router: RouterPlus
    }
}

