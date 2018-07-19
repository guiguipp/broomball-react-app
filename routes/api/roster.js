const roster = require("express").Router()

roster.get("/:id", function(req, res) {
    console.log("req.params in roster get route: ", req.params)
    res.send("Get route for roster is here") 
})

roster.post("/:id", function(req, res) {
    console.log("req.params in roster post route: ", req.params)
    console.log("req.body in roster post route: ", req.body)
    res.send("Post route for roster is here") 
})

roster.put("/:id", function(req, res) {
    console.log("req.params in roster post route: ", req.params)
    console.log("req.body in roster put route: ", req.body)
    res.send("Put route for roster is here") 
})

roster.delete("/:id", function(req, res) {
    console.log("req.id in roster put route: ", req.body)
    res.send("Delete route for roster is here") 
})

module.exports = roster;