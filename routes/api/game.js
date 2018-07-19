const game = require("express").Router()

game.get("/:id", function(req, res) {
    console.log("req.params in game get route: ", req.params)
    res.send("Get route for game is here") 
})

game.post("/:id", function(req, res) {
    console.log("req.params in game post route: ", req.params)
    console.log("req.body in game post route: ", req.body)
    res.send("Post route for game is here") 
})

game.put("/:id", function(req, res) {
    console.log("req.params in game post route: ", req.params)
    console.log("req.body in game put route: ", req.body)
    res.send("Put route for game is here") 
})

game.delete("/:id", function(req, res) {
    console.log("req.id in game put route: ", req.body)
    res.send("Delete route for game is here") 
})

module.exports = game;