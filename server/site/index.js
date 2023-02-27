import Koa from 'koa';
import Router from 'koa-router';
import BodyParser from 'koa-bodyparser';
import serve from "koa-static";
import send from "koa-send";

const router = new Router();
router.use(BodyParser());

import { detail, patchDetail } from './api/detail';
import { list } from './api/list'

router.get('/api/list', list)
router.get('/api/detail', detail);
router.patch('/api/create', patchDetail);

const app = new Koa();
app
  .use(router.routes())
  .use(router.allowedMethods())
  .use(serve('./public/'))
  // .use(async ctx => {
  //   await send(ctx, './public/index.html');
  // })
  .listen(8083);
