const game = require("express").Router()
const db = require("../../models")

game.get("/", function(req, res) {
    db.Game.find({}, null, {sort: {game_date: 1}})
    .populate("players.player")    
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
    .populate("Player")
        .then(function(dbGame){
            res.send(dbGame)
        })
        .catch(function(err){
            res.send(err)
        })
    })

game.post("/", function(req, res) {

    let NewGame = db.Game
    ({
        _id: req.body.game_date,
        game_date: req.body.game_date,
        players: req.body.players,
    })
    NewGame.save()
    .then(function(dbGame){
        res.send(dbGame)
    })
    .catch(function(err){
        res.send(err)
    })
})

game.put("/:id", function(req, res) {
    // console.log("req.params.id in game put route: ", req.params.id)
    // console.log("req.body in game put route: ", req.body)
    let playerId = req.body.data.player
    // We get the key/value of the update sent to the API in order to dynamically update the database
    // will probably need to change that once we have queries to update other information not stored in 
    // gameInfo (in this case, maybe use an if/else: if(req.body.data.gameInfo){ }, otherwise, drop "gameInfo" 
    // from let keyToUpdate = "players.$.gameInfo." + Object.keys(req.body.data.gameInfo)
    let keyToUpdate = "players.$.gameInfo." + Object.keys(req.body.data.gameInfo)
    let parsedValue = JSON.parse(Object.values(req.body.data.gameInfo))
    // For this, we neet to create the object before hand (cannot cast the string as a property key directly)
    let id = {_id: req.params.id, "players._id": playerId}
    let update = {}
    update[keyToUpdate] = parsedValue;
    
    db.Game.findOneAndUpdate(id,update,{new: true})
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