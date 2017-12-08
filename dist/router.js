"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const router = new Router();
router.get('/', (ctx, next) => {
    ctx.body = 'hello';
});
exports.default = router;
//# sourceMappingURL=router.js.map