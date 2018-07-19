const router = require("express").Router();
const apiRoutes = require("./api");

// all routes coming from the api folder will start with /api/
router.use("/api", apiRoutes)

module.exports = router;