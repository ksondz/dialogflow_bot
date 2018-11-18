const express = require("express");
const bodyParser = require("body-parser");

const restService = express();

restService.use(
    bodyParser.urlencoded({
        extended: true
    })
);

restService.use(bodyParser.json());

restService.post("/echo", function(req, res) {

    const text =
        req.body.queryResult &&
        req.body.queryResult.parameters &&
        req.body.queryResult.parameters.echoText
            ? req.body.queryResult.parameters.echoText
            : "Seems like some problem. Speak again.";

    return res.json({
        fulfillmentText: text,
        source: "webhook-echo-sample",
    });
});

restService.listen(process.env.PORT || 8000, function() {
    console.log("Server up and listening");
});