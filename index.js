
const Koa = require('koa');
const router = require('koa-router')();
const koaBody = require('koa-body');

const app = new Koa();

app.use(koaBody());

router.get('/', async ctx => {
    ctx.body = 'My koa API';
});

router.post('/echo', async ctx => {
    const { queryResult } = ctx.request.body;

    let text = "Seems like some problem. Speak again.";

    if (queryResult && queryResult.parameters && queryResult.parameters.echoText) {
        text = queryResult.parameters.echoText;
    }

    ctx.body = {
        fulfillmentText: text,
        source: "webhook-echo-sample",
    };
});

app.use(router.routes());

app.listen(8000);

console.log("Server up and listening");