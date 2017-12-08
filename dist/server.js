"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const config_1 = require("./config/config");
const router_1 = require("./router");
class Server {
    constructor() {
        this.app = new Koa();
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.app.use(bodyParser());
    }
    routes() {
        this.app.use(router_1.default.routes()).use(router_1.default.allowedMethods());
    }
    listen(port = config_1.default.port) {
        this.app.listen(port, () => {
            console.log(('App is running at http://localhost:%d in %s mode'), config_1.default.port || 3000, this.app.env);
            console.log('Press CTRL-C to stop\n');
        });
    }
}
exports.default = new Server().listen();
//# sourceMappingURL=server.js.map