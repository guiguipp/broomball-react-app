const router = require("express").Router();
const apiRoutes = require("./api");

// all routes coming from the api folder will start with /api/
router.use("/api", apiRoutes)


const cors = require('cors')
router.use(cors())

module.exports = router;