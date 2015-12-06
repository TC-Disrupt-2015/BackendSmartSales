function ProductRoute(express, uploading, Product, Merchant, Hobbyist) {
    var router = express.Router();
    //default context root is /product
    router.post('/register', function (req, res, next) {
        if (!req.body.name || !req.body.description || !req.body.unitsAvailable || !req.body.tags) {
            return res.status(400).send();
        }
        var newProduct = new Product();
        newProduct.name = req.body.name;
        newProduct.description = req.body.description;
        newProduct.photos = [];
        newProduct.price = req.body.price;
        newProduct.unitsAvailable = req.body.unitsAvailable;
        newProduct.tags = req.body.tags.split(',');
        newProduct.hId = req.body.hId;
        newProduct.save(function (err, savedProduct) {
            if (err) {
                console.log(err);
                return res.status(500).send();
            }
            if (savedProduct) {
                return res.send(savedProduct);
            }
            return res.status(500).send();
        });
    });

// TODO: ensure that the attribute name on the client side is photo
    router.post('/:productId/upload', uploading.single('photo'), function (req, res) {

        var productId = req.params.productId;
        Product.findOne({_id: productId}, function (err, foundProduct) {
            if (err) {
                console.log(err);
                return res.status(500).send();
            }

            if (!foundProduct) {
                console.log('could not find product');
                return res.status(404).send();
            }

            if (foundProduct) {
                var productObj = foundProduct;
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

//get list of products near to merchant
    router.get('/near/merchant/:merchantId', function (req, res) {

        var merchantId = req.params.merchantId;

        Merchant.findOne({merchantId: merchantId}, function (err, foundMerchant) {
            if (err) {
                console.log(err);
                return res.status(500).send();
            }

            if (!foundMerchant) {
                console.log('could not find Merchant');
                return res.status(404).send();
            }

            if (foundMerchant) {
                var merchantObj = foundMerchant;

                Hobbyist.find({location:{
                    $near: [merchantObj.location[0], merchantObj.location[1]],
                    $maxDistance: 25
                }}, function (err, foundHobbyists) {
                    if (err) {
                        console.log(err);
                        return res.status(500).send();
                    }

                    if (!foundHobbyists) {
                        console.log('could not find any products');
                        return res.status(404).send();
                    }

                    if (foundHobbyists) {
                        var hIds = [];
                        for (var i = 0; i < foundHobbyists.length; i++) {
                            var distance = Math.sqrt(Math.pow((merchantObj.location[0] - foundHobbyists[i].location[0]), 2) + Math.pow((merchantObj.location[1] - foundHobbyists[i].location[1]), 2));
                            if (distance <= foundHobbyists[i].radius) {
                                hIds.push(foundHobbyists[i]._id);
                            }
                        }
                        if (hIds.length === 0) {
                            return res.send([]);
                        }

                        if (hIds.length > 0) {
                            Product.find({
                                hId: {
                                    $in: hIds
                                }
                            }, function (err, productList) {
                                if (err) {
                                    console.log(err);
                                    return res.status(500).send();
                                }
                                if (productList.length === 0) {
                                    return res.send([]);
                                }
                                return res.send(productList);
                            });
                        }
                    }
                });
            }
        });
    });


//get list of products by hobbyist id
    router.get('/:hId', function (req, res) {

        var hId = req.params.hId;
        Product.find({hId: hId}, function (err, productList) {
            if (err) {
                console.log(err);
                return res.status(500).send();
            }
            if (productList.length === 0) {
                return res.send([]);
            }
            return res.send(productList);
        });
    });
    return router;
}

module.exports = ProductRoute;
