const game = require("express").Router()
const db = require("../../models")

const moment = require("moment");

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
        win: "Tie",
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
        }
    // This handles game updates 
    else {
        /* when a game update is sent at the same time as the player update, they are sent with a "playerUpdate" nested object. 
        For instance, the score is updated when a player scores a goal. We grab all keys/values before that to update the game, 
        and the player update separately then send them together to the db */
        if (req.body.data.playerUpdate) {
            let updateKeys = Object.keys(req.body.data)
            let updateValues = Object.values(req.body.data)
            let gameInfoKey = "players.$.gameInfo." + Object.keys(req.body.data.playerUpdate.gameInfo)[0]
            let gameInfoValue = Object.values(req.body.data.playerUpdate.gameInfo)[0]
            id = {_id: req.params.id, "players._id": req.body.data.playerUpdate.player}
            update = {
                [updateKeys[0]]: updateValues[0],
                [updateKeys[1]]: updateValues[1],
                [gameInfoKey]: gameInfoValue
                }
            }
        // else, the update only pertains to the game data (ex: lock/unlock)
        else {
            id = {_id: req.params.id};
            update = req.body.data;
            }
        }
    let updateWithTimeStamp = { updated: moment(), ...update }
    console.log("Update with time stamp?: ", updateWithTimeStamp)
    // db.Game.findOneAndUpdate({_id: "2018-08-26", "players._id": "5b6ebb53866bfe76441d998f"}, {win: "Dark", "goals_dark": 3,'players.$.gameInfo.goals': 2},{new: true})
    db.Game.findOneAndUpdate(id, updateWithTimeStamp, {new: true})
    .then(function(dbGame){
        res.send(dbGame)
        })
    .catch(function(err){
        res.send(err)
        })
    }) 

game.delete("/:id", function(req, res) {
    // console.log("req.params.id in game delete route: ", req.params.id)
    db.Game.findByIdAndDelete(req.params.id)
    .then(function(dbGame){
        res.send(dbGame)
        })
    .catch(function(err){
        res.send(err)
        }) 
    })


module.exports = game;