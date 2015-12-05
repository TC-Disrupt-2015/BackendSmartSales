/**
 * Created by manthanhd on 12/5/2015.
 */
var express = require('express');
var router = express.Router();
var Hobbyst = require("../models/HobbyistModel");

// default context root is /hregister
router.post('/', function(req, res, next) {
    Hobbyst.findOne({email: req.body.email}, function(err, foundHobbyst) {
        if (err) {
            console.log(err);
            return res.status(500).send();
        }

        if (foundHobbyst) {
            return res.send(foundHobbyst);
        }

        var newHobbyst = new Hobbyst();
        newHobbyst.name = req.body.name;
        newHobbyst.email = req.body.email;
        newHobbyst.location = {
            lat: req.body.location.lat,
            lon: req.body.location.lon
        };
        newHobbyst.productsId = [];
        newHobbyst.radius = req.body.radius;

        newHobbyst.save(function (err, savedHobbyst) {
            if (err) {
                console.log(err);
                return res.status(500).send();
            }

            if (savedHobbyst) {
                return res.send(savedHobbyst);
            }

            return res.status(500).send();
        });
    });
});

module.exports = router;
