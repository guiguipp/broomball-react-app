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
    let update = {}
    let id = {}
    // There are two main scenarios to handle: updates to the game itself, and (nested) updates to the player
    // object within the game object. This handles the latter, where there is a player and its "gameInfo" to update 
    if (req.body.data.gameInfo) {
        let keys = Object.keys(req.body.data.gameInfo) 
        let arrayOfKeys = keys.map((key) => "players.$.gameInfo." + key)
        let arrayOfValues = Object.values(req.body.data.gameInfo)
        // We need to create the object beforehand (cannot cast the string as a property key directly)
        id = {_id: req.params.id, "players._id": playerId}
        // A for loop allows us to do more than one update at a time (they are passed in the same update object through closure)
        for (let i = 0; i < arrayOfKeys.length; i++) {
            update[arrayOfKeys[i]] = arrayOfValues[i]
        }
    }/*
    else if (req.body.data.combinedUpdate) {
        console.log("in the else if: ", req.body.data.combinedUpdate)
        console.log("id of game: ", req.params.id)
        let keys = Object.keys(req.body.data.combinedUpdate)
        console.log("keys: ", keys)
        console.log("game update: ", keys[0])
        let arrayOfValues = Object.values(req.body.data.combinedUpdate)
        console.log("New game info: ", arrayOfValues[0])
        let gameUpdate= `${keys[0]}:${arrayOfValues[0]}`
        console.log("GameUpdate: ", gameUpdate)
        let playerUpdate = `player._id:${req.body.data.combinedUpdate.player}`
    }*/
    // This handles Game updates via switch statement on the key of the update sent. 
    else {
        // console.log("req.body.data sans gameInfo: ", req.body.data)
        id = {_id: req.params.id};
        update = req.body.data;
        /* We might need a Switch statement later to handle different scenarios */
        /*let key = Object.keys(req.body.data)
        let parsedKey = key[0]
        
        switch (parsedKey){
            case 'lock_status': 
            console.log("Switch case lock")
                    id = {_id: req.params.id};
                    update = req.body.data;
                    break;
            
            case 'players':
            console.log("Switch case players")
                    id = {_id: req.params.id},    
                    update = req.body.data;
                    break;

            default: 
            return;
        }*/
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