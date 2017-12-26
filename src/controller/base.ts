import * as Koa from 'koa';

export default class BaseController {
    ctx: Koa.Context;
    app: Koa;
    request: Koa.Request;
    constructor(ctx: Koa.Context) {
        ctx.type = 'json';

        this.ctx = ctx;
        this.app = ctx.app;
        this.request = ctx.request;
    }
    success(data: any, msg: string) {
        this.ctx.body = {
            error: {
                returnCode: 0,
                returnMessage: msg || 'success',
                returnUserMessage: msg || '成功'
            },
            data: data
        };
    }
    fail(errmsg: string = '', errno: number = 1) {
        this.ctx.throw(errno, errmsg);
    }
}
