import * as Router from 'koa-router';

import * as home from './controller/home';

const router: Router = new Router();

router.get('/', home.list);

export default router;