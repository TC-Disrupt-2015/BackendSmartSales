/**
 * Created by manthanhd on 12/5/2015.
 */
function OrderRoute(express, OrderModel) {
    var router = express.Router();

    router.get('/merchant/:merchantId', function (req, res) {
        var merchantId = req.params.merchantId;
        if (!merchantId) {
            return res.status(400).send();
        }
        OrderModel.find({merchantId: merchantId}, function (err, orders) {
            if (err) {
                console.log(err);
                return res.status(500).send();
            }

            if (!orders || orders.length == 0) {
                return res.status(404).send();
            }

            return res.send(orders);
        });
    });

    router.get('/product/:productId', function (req, res) {
        var productId = req.params.productId;
        if (!productId) {
            return res.status(400).send();
        }

        OrderModel.find({productId: productId}, function (err, orders) {
            if (err) {
                console.log(err);
                return res.status(500).send();
            }

            if (!orders || orders.length == 0) {
                return res.status(404).send();
            }

            return res.send(orders);
        });
    });

    router.post('/:merchantId/:productId/create', function (req, res) {
        if (!req.params.merchantId || !req.params.productId || !req.body.inventoryId || !req.body.status || !req.body.quantity || !req.body.description) {
            return res.status(400).send();
        }
        var neworder = new OrderModel();
        neworder.inventoryId = req.body.inventoryId;
        neworder.merchantId = req.params.merchantId;
        neworder.productId = req.params.productId;
        neworder.status = req.body.status;
        neworder.quantity = req.body.quantity;
        neworder.description = req.body.description;
        neworder.save(function (err, savedOrder) {
            if (err) {
                console.log(err);
                return res.status(500).send();
            }

            if (savedOrder) {
                return res.send(savedOrder);
            }

            return res.status(500).send();
        });
    });

    router.put("/:orderId/:status", function(req, res) {
        var orderId = req.params.orderId;
        var status = req.params.status;
        if(!orderId || !status) {
            return res.status(400).send();
        }

        OrderModel.findOne({_id: orderId}, function(err, order) {
            if(err) {
                console.log(err);
                return res.status(500).send();
            }

            if(!order) {
                return res.status(404).send();
            }

            order.status = status;
            order.save(function(err, savedOrder) {
                if(err) {
                    console.log(err);
                    return res.status(500).send();
                }

                if(!savedOrder) {
                    return res.status(404).send();
                }

                return res.send(order);
            })
        })
    });

    router.get('/:orderId/status', function(req, res) {
        var orderId = req.params.orderId;
        if(!orderId) {
            return res.status(400).send();
        }

        OrderModel.findOne({_id: orderId}, function(err, order) {
            if(err) {
                console.log(err);
                return res.status(500).send();
            }

            if(!order) {
                return res.status(404).send();
            }

            return res.send({status: order.status});
        })
    });

    return router;
}

module.exports = OrderRoute;
