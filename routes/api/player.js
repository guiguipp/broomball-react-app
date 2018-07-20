const player = require("express").Router()
const db = require("../../models")

player.get("/", function(req, res) {
    db.Player.find({}, null, {sort: {name: 1}})
        .then(function(dbPlayer){
            res.json(dbPlayer)
        })
        .catch(function(err){
            res.json(err)
        })
    })

player.get("/:id", function(req, res) {
    console.log("req.params in player get route: ", req.params)
    db.Player.findById(req.params.id)
        .then(function(dbPlayer){
            res.json(dbPlayer)
        })
        .catch(function(err){
            res.json(err)
        })
    })

player.post("/", function(req, res) {
    // console.log("req.body in player post route: ", req.body)
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
        // console.log(res)
        res.json(dbPlayer)
    })
    .catch(function(err){
        res.json(err)
    })
})

player.put("/:id", function(req, res) {
    // console.log("req.params.id in player put route: ", req.params.id)
    // console.log("req.params.body in player put route: ", req.body)
    db.Player.findByIdAndUpdate(req.params.id, req.body)
        .then(function(dbPlayer){
            res.json(dbPlayer)
            })
        .catch(function(err){
            res.json(err)
            }) 
    })

player.delete("/:id", function(req, res) {
    console.log("req.params.id in player put route: ", req.params.id)
    db.Player.findByIdAndDelete(req.params.id)
    .then(function(dbPlayer){
        res.json(dbPlayer)
        })
    .catch(function(err){
        res.json(err)
        }) 
    })

module.exports = player;