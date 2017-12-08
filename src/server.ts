import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as helmet from 'koa-helmet';
import * as mongoose from 'mongoose';

import config from './config/config';
import router from './router';

class Server {
    app: Koa;
    constructor() {
        this.app = new Koa();

        this.middlewares();
        this.routes();
    }
    middlewares() {

        this.app.use(bodyParser())
            .use(helmet());

    }
    routes() {
        this.app.use(router.routes()).use(router.allowedMethods());
    }
    listen(port: number = config.port) {
        this.app.listen(port, () => {
            console.log(('App is running at http://localhost:%d in %s mode'), config.port || 3000, this.app.env);
            console.log('Press CTRL-C to stop\n');
        });
    }
}

export default new Server().listen();