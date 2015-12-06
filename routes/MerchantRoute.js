/**
 * Created by manthanhd on 12/5/2015.
 */
function MerchantRoute(express, MerchantModel) {
    var router = express.Router();
    /* base path is /merchant. */
    router.post('/:merchantId/register', function (req, res, next) {
        var merchantId = req.params.merchantId;
        if (!merchantId || !req.body.accessToken || !req.body.location || !req.body.location.lat || !req.body.location.lon) {
            return res.status(400).send();
        }

        MerchantModel.findOne({merchantId: merchantId}, function (err, foundMerchant) {
            if (err) {
                console.log(err);
                return res.status(500).send();
            }

            if (foundMerchant) {
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

            newMerchant.save(function (err, savedMerchant) {
                if (err) {
                    console.log(err);
                    return res.status(500).send();
                }

                if (!savedMerchant) {
                    return res.status(500).send();
                }

                return res.send(savedMerchant);
            });
        });
    });

    return router;
}

module.exports = MerchantRoute;
