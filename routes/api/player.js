const player = require("express").Router()
const db = require("../../models")

player.get("/", function(req, res) {
    db.Player.find({})
        .then(function(dbPlayer){
            res.json(dbPlayer)
        })
        .catch(function(err){
            res.json(err)
        })
})

player.get("/:id", function(req, res) {
    console.log("req.params in player get route: ", req.params)
    res.send("Get route for player is here") 
})

player.post("/", function(req, res) {
    console.log("req.body in player post route: ", req.body)
    var NewPlayer = db.Player
    ({
        name: req.body.name,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        player_level: req.body.player_level,
        preferred_position: req.body.preferred_position,
        player_status: req.body.player_status,
        email: req.body.email
    })

    NewPlayer.save()
    .then(function(dbPlayer){
        console.log(res)
        res.json(dbPlayer)
    })
    .catch(function(err){
        res.json(err)
    })
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