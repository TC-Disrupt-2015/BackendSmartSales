/**
 * Created by manthanhd on 12/5/2015.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var Hobbyst = require("../models/HobbyistModel")(mongoose);

// default context root is /hobbyist
router.post('/register', function(req, res, next) {
    if(!req.body.name ||
        !req.body.email ||
        !req.location ||
        !req.location.lat ||
        !req.location.lon ||
        !req.radius) {
        return res.status(400).send();
    }

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
