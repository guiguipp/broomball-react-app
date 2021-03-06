const player = require("express").Router()
const db = require("../../models")

const moment = require("moment");

player.get("/", function(req, res) {
    db.Player.find({}, null, {sort: {name: 1}})
        .then(function(dbPlayer){
            res.send(dbPlayer)
        })
        .catch(function(err){
            res.send(err)
        })
    })

player.get("/:id", function(req, res) {
    console.log("req.params in player get route: ", req.params)
    db.Player.findById(req.params.id)
        .then(function(dbPlayer){
            res.send(dbPlayer)
        })
        .catch(function(err){
            res.send(err)
        })
    })

player.get("/:field/:data", function(req, res) {
    db.Player.findById(req.params.id)
        .then(function(dbPlayer){
            res.send(dbPlayer)
        })
        .catch(function(err){
            res.send(err)
        })
    })                      


player.post("/", function(req, res) {
    console.log("req.body in player post route: ", req.body)
    console.log("req.body.player.name in player post route: ", req.body.player.name)

    var newPlayer = db.Player
    ({
        name: req.body.player.name,
        fullName: req.body.player.fullName,
        playerLevel: req.body.player.playerLevel,
        preferredPosition: req.body.player.preferredPosition,
        membershipStatus: req.body.player.membershipStatus,
        email: req.body.player.email
    })
    
    newPlayer.save()
        .then(function(dbPlayer){
            // console.log(res)
            res.send(dbPlayer)
        })
        .catch(function(err){
            res.send(err)
        })

    })

player.put("/:id", function(req, res) {
    let updateObj = { updated: moment(), ...req.body.data }
    db.Player.findByIdAndUpdate(req.params.id, updateObj, {new: true}) 
        .then(function(dbPlayer){
            console.log("dbPlayer: ", dbPlayer)
            res.send(dbPlayer)
            })
        .catch(function(err){
            res.send(err)
            }) 
    })

player.delete("/:id", function(req, res) {
    db.Player.findByIdAndDelete(req.params.id)
    .then(function(dbPlayer){
        res.send(dbPlayer)
        })
    .catch(function(err){
        res.send(err)
        }) 
    })

module.exports = player;