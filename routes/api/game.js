const game = require("express").Router()
const db = require("../../models")

game.get("/:date/:span", function(req, res) {
    let date = req.params.date;
    let span = req.params.span;
    if (span === "past") {
        db.Game.find({
            game_date: {$lte: date}
        }, null, {sort: {game_date: 1}})
            .then(function(dbGame){
                res.send(dbGame)
            })
            .catch(function(err){
                res.send(err)
            })    
        }
    else {
        db.Game.find({
            game_date: {$gte: date}
        }, null, {sort: {game_date: 1}})
            .then(function(dbGame){
                res.send(dbGame)
            })
            .catch(function(err){
                res.send(err)
            })    
        }    
    });


    /*db.Game.find({
        game_date: 
    }, null, {sort: {game_date: 1}})
        .then(function(dbGame){
            res.send(dbGame)
        })
        .catch(function(err){
            res.send(err)
        })
    })*/

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