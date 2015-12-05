var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Product = require('../models/ProductModel')(mongoose);
var multer = require('multer');
var hat = require('hat');


//default context root is /product
router.post('/register', function(req, res, next) {
  var newProduct = new Product();
  newProduct.name = req.body.name;
  newProduct.description = req.body.description;
  // newProduct.photos = req.body.photos,
  newProduct.unitsAvailable = req.body.unitsAvailable;
  newProduct.tags = req.body.tags.split(',');
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

var uploading = multer({
  dest: __dirname + '../public/uploads/',
  limits: {fileSize: 1000000, files:1}
});

// TODO: ensure that the attribute name on the client side is photo
router.post('/:productId/upload', uploading.single(hat()), function(req, res) {
  
  var productId = product.req.params.productId;
  Product.findOne({_id: productId}, function(err, foundProduct) {
        if (err) {
          console.log(err);
          return res.status(500).send();
        }

        if (!foundProduct) {
          console.log('could not find product');
          return res.status(404).send();
        }

        if (foundProduct) {
          var productObj = res.send(foundProduct);
          productObj.photos.push(req.files.photo.name);

          productObj.save(function (err, savedProduct) {
            if (err) {
                console.log(err);
                return res.status(500).send();
            }

            if (savedProduct) {
                return res.send(savedProduct);
            }
            return res.status(500).send();
          });
        }
    });
});

module.exports = router;
