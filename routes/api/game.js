const game = require("express").Router()

game.get("/:id", function(req, res) {
    console.log("req.params in game route: ", req.params)
    res.send("Get Route for game is here") 
})

module.exports = game;