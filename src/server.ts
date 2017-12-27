import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as helmet from 'koa-helmet';
import * as mongoose from 'mongoose';
import * as bluebird from 'bluebird';

global.Promise = bluebird;
(<any>mongoose).Promise = bluebird;

import config from './config/config';
import router from './router';

class Server {
    app: Koa;
    constructor() {
        this.initdb();

        this.app = new Koa();

        this.middlewares();
        this.routes();

        this.unhandledRejectionHandler = this.unhandledRejectionHandler.bind(this);
        process.on('unhandledRejection', this.unhandledRejectionHandler);
    }
    initdb() {
        return mongoose.connect(config.mongodb, { useMongoClient: true });
    }
    middlewares() {
        this.app.use(bodyParser()).use(helmet());
    }
    routes() {
        this.app.use(router.routes()).use(router.allowedMethods());
    }
    private unhandledRejectionHandler(err: Error) {
        if (err.name === 'Error') {
            err.name = 'unhandledRejectionError';
        }
        console.error(err);
    }
    listen(port: number = config.port) {
        this.app.listen(port, () => {
            console.log('App is running at http://localhost:%d in %s mode', config.port || 3000, this.app.env);
            console.log('Press CTRL-C to stop\n');
        });
    }
}

export default new Server().listen();
