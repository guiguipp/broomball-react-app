const roster = require("express").Router()
const db = require("../../models")

roster.get("/", function(req, res) {
    db.Roster.find({}, null, {sort: {roster_date: 1}})
        .then(function(dbRoster){
            res.send(dbRoster)
        })
        .catch(function(err){
            res.send(err)
        })
    })

roster.get("/:id", function(req, res) {
    // console.log("req.params in roster get route: ", req.params)
    db.Roster.findById(req.params.id)
    .populate("game")
    .populate("player")
        .then(function(dbRoster){
            res.send(dbRoster)
        })
        .catch(function(err){
            res.send(err)
        })
    })

roster.post("/", function(req, res) {
    // console.log("req.body in Roster post route: ", req.body)
    console.log("req.body.game in Roster post route: ", req.body.game)
    console.log("req.body.player.name in Roster post route: ", req.body.player.name)
    let id = req.body.game + "_" + req.body.player.name
    let NewRoster = db.Roster
    ({
        _id: id,
        game: req.body.game,
        // game_id: req.body.game,
        player: req.body.player,
        player_name: req.body.player.name
    })
    NewRoster.save()
    .then(function(dbRoster){
        // console.log(dbRoster)
        res.send(dbRoster)
    })
    .catch(function(err){
        res.send(err)
    })
    
})

roster.put("/:id", function(req, res) {
    // console.log("req.params.id in roster put route: ", req.params.id)
    // console.log("req.params.body in roster put route: ", req.body)
    db.Roster.findByIdAndUpdate(req.params.id, req.body)
        .then(function(dbRoster){
            res.send(dbRoster)
            })
        .catch(function(err){
            res.send(err)
            }) 
    })

roster.delete("/:id", function(req, res) {
    // console.log("req.params.id in roster put route: ", req.params.id)
    db.Roster.remove({game: req.params.id})
    .then(function(dbRoster){
        res.send(dbRoster)
        })
    .catch(function(err){
        res.send(err)
        }) 
    })

roster.delete("/", function(req, res) {
    // console.log("req.params.id in roster put route: ", req.params.id)
    console.log("req.body in roster delete route: ", req.body)
    console.log("req.body.game in roster delete route: ", req.body.game)
    db.Roster.remove({game: req.body.game})
    .then(function(dbRoster){
        res.send(dbRoster)
        })
    .catch(function(err){
        res.send(err)
        }) 
    })

module.exports = roster;