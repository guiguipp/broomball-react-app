const game = require("express").Router()
const db = require("../../models")

game.get("/", function(req, res) {
    db.Game.find({}, null, {sort: {game_date: 1}})
        .then(dbGame => {
            res.send(dbGame)
        })
        .catch(err => {
            res.send(err.response)
        })     
    });

game.get("/:id", function(req, res) {
    // console.log("req.params in game get route: ", req.params)
    db.Game.findById(req.params.id)
        .then(function(dbGame){
            res.send(dbGame)
        })
        .catch(function(err){
            res.send(err)
        })
    })

game.post("/", function(req, res) {
    // console.log("req.body in Game post route: ", req.body)
    let NewGame = db.Game
    ({
        _id: req.body.game_date,
        game_date: req.body.game_date
    })
    NewGame.save()
    .then(function(dbGame){
        // console.log(res)
        res.send(dbGame)
    })
    .catch(function(err){
        res.send(err)
    })
})

game.put("/:id", function(req, res) {
    // console.log("req.params.id in game put route: ", req.params.id)
    // console.log("req.params.body in game put route: ", req.body)
    db.Game.findByIdAndUpdate(req.params.id, req.body)
        .then(function(dbGame){
            res.send(dbGame)
            })
        .catch(function(err){
            res.send(err)
            }) 
    })

game.delete("/:id", function(req, res) {
    // console.log("req.params.id in game put route: ", req.params.id)
    db.Game.findByIdAndDelete(req.params.id)
    .then(function(dbGame){
        res.send(dbGame)
        })
    .catch(function(err){
        res.send(err)
        }) 
    })


module.exports = game;