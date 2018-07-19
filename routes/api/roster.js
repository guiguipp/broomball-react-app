const roster = require("express").Router()

roster.get("/:id", function(req, res) {
    console.log("req.params in roster route: ", req.params)
    res.send("Get Route for roster is here") 
})

module.exports = roster;