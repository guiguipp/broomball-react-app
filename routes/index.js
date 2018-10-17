const router = require("express").Router();
const apiRoutes = require("./api");
const authentication = require("./authentication")

// https://enable-cors.org/server_expressjs.html
// https://stackoverflow.com/questions/7067966/how-to-allow-cors
const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next()
}
router.use(allowCrossDomain)

// all routes coming from the api folder will start with /api/
router.use("/api", apiRoutes)
router.use("/", authentication)

module.exports = router;