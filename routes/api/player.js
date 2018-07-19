const player = require("express").Router()

player.get("/:id", function(req, res) {
    console.log("req.params in player route: ", req.params)
    res.send("Get Route for player is here") 
})

module.exports = player;