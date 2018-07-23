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
        .then(function(dbRoster){
            res.send(dbRoster)
        })
        .catch(function(err){
            res.send(err)
        })
    })

roster.post("/", function(req, res) {
    // console.log("req.body in Roster post route: ", req.body)
    let id = req.body.game_date + "_" + req.body.player_name
    let NewRoster = db.Roster
    /*game: {type: String, required: true},
    player: { type: String, required: true }, */

    /*
    // Route for getting all Articles from the db
    app.get("/articles", function(req, res) {
    db.Article.find({})
        .then(function(dbArticle){
        res.send(dbArticle);
        })
        .catch(function(err){
        res.send(err);
        })
    });

    // Route for grabbing a specific Article by id, populate it with it's note
    app.get("/articles/:id", function(req, res) {
    db.Article.findOne({_id: req.params.id})
        .populate("note")  
        .then(function(Article){
            res.send(Article);
        })
        .catch(function(err){
            res.send(err);
        })
    });

    */

    ({
        _id: id,
        game_date: req.body.game_date,
        player_name: req.body.player_name
    })
    NewRoster.save()
    .then(function(dbRoster){
        // console.log(res)
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
    db.Roster.findByIdAndDelete(req.params.id)
    .then(function(dbRoster){
        res.send(dbRoster)
        })
    .catch(function(err){
        res.send(err)
        }) 
    })


module.exports = roster;