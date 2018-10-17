const User = require('../../models/user');

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const router = require("express").Router()

const flash = require("connect-flash")
router.use(flash());

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