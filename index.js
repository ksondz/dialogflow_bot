
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

router.post('/dialogflow', dialogflow);


app.use(router.routes());

app.listen(8000);

console.log("Server up and listening");




async function dialogflow() {
    const projectId = 'ENTER_PROJECT_ID_HERE'; //https://dialogflow.com/docs/agents#settings
    const sessionId = 'quickstart-session-id';
    const query = 'hello';
    const languageCode = 'en-US';

// Instantiate a DialogFlow client.
    const dialogflow = require('dialogflow');
    const sessionClient = new dialogflow.SessionsClient();

// Define session path
    const sessionPath = sessionClient.sessionPath(projectId, sessionId);

// The text query request.
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: query,
                languageCode: languageCode,
            },
        },
    };

// Send request and log result
    sessionClient
        .detectIntent(request)
        .then(responses => {
            console.log('Detected intent');
            const result = responses[0].queryResult;
            console.log(`  Query: ${result.queryText}`);
            console.log(`  Response: ${result.fulfillmentText}`);
            if (result.intent) {
                console.log(`  Intent: ${result.intent.displayName}`);
            } else {
                console.log(`  No intent matched.`);
            }
        })
        .catch(err => {
            console.error('ERROR:', err);
        });
}