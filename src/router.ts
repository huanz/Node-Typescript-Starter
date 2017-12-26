import * as Koa from 'koa';
import * as Router from 'koa-router';

const router: Router = new Router();

router.get('/', (ctx: Koa.Context, next: Function) => {
    ctx.body = 'hello';
});

export default router;