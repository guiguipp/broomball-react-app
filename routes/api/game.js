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
    console.log("req.body in game put route: ", req.body)
    let playerId = req.body.data.player
    // We get the key/value of the update sent to the API in order to dynamically update the database.
    // We will probably need to change this syntax once we have queries to update other information not stored in 
    // gameInfo (in this case, maybe use an if/else: if(req.body.data.gameInfo){ }, otherwise, drop "gameInfo" 
    // from the declaration 'let keyToUpdate = "players.$.gameInfo." + Object.keys(req.body.data.gameInfo)'
    let update = {}
    let id = {}
    if(req.body.data.gameInfo) {
        let keys = Object.keys(req.body.data.gameInfo) 
        let arrayOfKeys = keys.map((key) => "players.$.gameInfo." + key)
        let arrayOfValues = Object.values(req.body.data.gameInfo)
        // We need to create the object beforehand (cannot cast the string as a property key directly)
        id = {_id: req.params.id, "players._id": playerId}
        // A for loop allows us to do more than one update at a time (they are passed in the same update object through closure)
        for (let i = 0; i < arrayOfKeys.length; i++) {
            update[arrayOfKeys[i]] = arrayOfValues[i]
        }
    }
    else {
        /* 
        This only applies when adding a 10_bucker. There will be other edits, such as adding a goal, an assist, etc.
        I think the best was to handle that would be a switch statement: getting the key from the req.body.data would
        tell us which scenario we want to handle.

        That said, here the key is not stated: it will need to be sent each time.
        */
        console.log("req.body.data sans gameInfo: ", req.body.data)
        id = {_id: req.params.id}
        update = {players: req.body.data}
    }

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