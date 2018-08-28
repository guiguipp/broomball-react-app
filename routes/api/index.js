const router = require("express").Router();

const player = require("./player");
const game = require("./game");

router.use("/player", player);
router.use("/game", game);

// console.log("routes > api > index.js Exporting")

module.exports = router;
