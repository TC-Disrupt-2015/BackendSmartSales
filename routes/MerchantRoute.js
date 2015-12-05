/**
 * Created by manthanhd on 12/5/2015.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var MerchantModel = require('../models/MerchantModel')(mongoose);

/* base path is /merchant. */
router.post('/:merchantId/register', function(req, res, next) {
    var merchantId = req.params.merchantId;
    MerchantModel.findOne({merchantId: merchantId}, function(err, foundMerchant) {
        if(err) {
            console.log(err);
            return res.status(500).send();
        }

        if(foundMerchant) {
            return res.send(foundMerchant);
        }

        // create one;
        var newMerchant = new MerchantModel();
        newMerchant.merchantId = merchantId;
        newMerchant.accessToken = req.body.accessToken;
        newMerchant.location = {
            lat: req.body.location.lat,
            lon: req.body.location.lon
        };

        newMerchant.save(function(err, savedMerchant) {
            if(err) {
                console.log(err);
                return res.status(500).send();
            }

            if(!savedMerchant) {
                return res.status(500).send();
            }

            return res.send(savedMerchant);
        });
    });
});

module.exports = router;
