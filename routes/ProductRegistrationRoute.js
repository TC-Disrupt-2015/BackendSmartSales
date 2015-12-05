var express = require('express');
var router = express.Router();
var product = require('../models/ProductModel');

//default context root is /product
router.post('/register', function(req, res, next) {
  var newProduct = new product();
  newProduct.name = req.body.name;
  newProduct.description = req.body.description;
  // newProduct.photos = req.body.photos,
  newProduct.unitsAvailable = req.body.unitsAvailable;
  newProduct.tags = [req.body.tags];
  newProduct.cloverId = req.body.cloverId;
  newProduct.save(function (err, savedProduct) {
  	if(err) {
  		console.log(err);
  		return res.status(500).send();
  	}

  	if(savedProduct) {
  		return res.send(savedProduct);
  	}
  	return res.status(500).send();
  });
});


module.exports = router;
