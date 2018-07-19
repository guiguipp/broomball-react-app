const router = require("express").Router();

const player = require("./player");
const game = require("./game");
const roster = require("./roster");

router.use("/player", player);
router.use("/game", game);
router.use("/roster", roster);

// console.log("routes > api > index.js Exporting")

module.exports = router;
