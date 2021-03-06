/**
 * Created by manthanhd on 12/5/2015.
 */
function HobbyistRoute(express, HobbyistModel) {
    var router = express.Router();
    // default context root is /hobbyist
    router.post('/register', function (req, res, next) {
        if (!req.body.name || !req.body.email || !req.body.location || !req.body.location.lat || !req.body.location.lon || !req.body.radius) {
            return res.status(400).send();
        }

        HobbyistModel.findOne({email: req.body.email}, function (err, foundHobbyst) {
            if (err) {
                console.log(err);
                return res.status(500).send();
            }

            if (foundHobbyst) {
                return res.send(foundHobbyst);
            }

            var newHobbyst = new HobbyistModel();
            newHobbyst.name = req.body.name;
            newHobbyst.email = req.body.email;
            newHobbyst.location = [
                req.body.location.lon,
                req.body.location.lat
            ];
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

    router.get('/login/:email', function(req, res) {
        if(!req.params.email) {
            return res.status(400).send();
        }

        HobbyistModel.findOne({email: req.params.email}, function(err, foundHobyist) {
            if(err) {
                console.log(err);
                return res.status(500).send();
            }

            if(foundHobyist) {
                return res.send(foundHobyist);
            }

            return res.status(404).send();
        });
    })

    return router;
}


module.exports = HobbyistRoute;
