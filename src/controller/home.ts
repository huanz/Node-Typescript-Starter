import * as Koa from 'koa';

import { Post, PostModel } from '../model/post';

export async function list(ctx: Koa.Context, next: Function) {
    const user = await Post.find()
        .lean()
        .exec();
    ctx.body = user;
}
