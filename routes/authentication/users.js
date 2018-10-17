const users = require("express").Router()
const db = require("../../models")

const moment = require("moment");

users.get('/:id', function (req, res) {
    if (req.session.passport !== undefined) {
    db.User.findById(req.session.passport.user, '-local.password', (err, user) => {
        if (err) console.log(err);
        return user;
    })
    .then((userData) => {
        console.log(userData)
        res.send(userData);
        });
    } else {
        console.log("User non authenticated")
        res.send(null);
    }
});

users.get("/", function(req, res) {
    db.User.find({})
    .then(dbUsers => {
            res.send(dbUsers)
        })
        .catch(err => {
            res.send(err.response)
        })     
    });

users.post("/", function(req, res) {
    // console.log("req.body in player post route: ", req.body)
    // console.log("req.body.userData in player post route: ", req.body.userData)
    var newUser = db.User
    ({
        ...req.body.userData,
        username: req.body.userData.username,
        password: req.body.userData.password,
        email: req.body.userData.email,
        created: moment()
    })
    
    newUser.save()
        .then(function(dbPlayer){
            // console.log(res)
            res.send(dbPlayer)
        })
        .catch(function(err){
            res.send(err)
        })

    })

module.exports = users;