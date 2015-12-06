/**
 * Created by manthanhd on 12/6/2015.
 */
var express = require('express');
function WebhooksRoute(express) {
    var router = express.Router();

    /* GET home page. */
    router.post('/event', function (req, res, next) {
        console.log(req.body);
        return res.status(200).send();
    });

    return router;
}

module.exports = WebhooksRoute;
