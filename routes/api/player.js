const player = require("express").Router()

player.get("/:id", function(req, res) {
    console.log("req.params in player get route: ", req.params)
    res.send("Get route for player is here") 
})

player.post("/:id", function(req, res) {
    console.log("req.params in player post route: ", req.params)
    console.log("req.body in player post route: ", req.body)
    res.send("Post route for player is here") 
})

player.put("/:id", function(req, res) {
    console.log("req.params in player post route: ", req.params)
    console.log("req.body in player put route: ", req.body)
    res.send("Put Route for player is here") 
})

player.delete("/:id", function(req, res) {
    console.log("req.id in player put route: ", req.body)
    res.send("Delete Route for player is here") 
})

module.exports = player;