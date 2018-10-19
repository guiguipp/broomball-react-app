const User = require('../../models/user');
// const express = require('express')
// const app = express()
const flash = require("connect-flash")
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const router = require("express").Router()

// connect Flash
router.use(flash());
router.use(function (req, res, next) {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    next();
})
passport.use(new LocalStrategy
    (function(username, password, done) {
        console.log("username in LocalStrategy: ", username)
        User.findOne({username: username}, function(err, user) {
            if (err) {return done(err); }
            if (!user) {
                return done(null, false, {message: "Incorrect username."});
            }
            if (!user.validPassword(password)) {
                return done(null, false, {message: "Incorrect password."});
            }
            return done(null, user);
            });
        }
    ));

router.post("/", 
    passport.authenticate('local', 
        {
            // successRedirect: "/Home",
            session: true,
            failureFlash: true,
            successFlash: "Welcome!",
        }), 
        function(req, res) {
            console.log('authenticated')
            /* We will have a user.privilege to filted users by db access */
            res.send({ 
                username: req.user.username,
                privilege: req.user.privilege,
                logged: true
            })
            
    })


module.exports = router;