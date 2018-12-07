const User = require('../../models/user');
const flash = require("connect-flash")
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const router = require("express").Router()

// connect Flash
router.use(flash());
// router.use(function (req, res, next) {
//     res.locals.success_msg = req.flash("success_msg");
//     res.locals.error_msg = req.flash("error_msg");
//     res.locals.error = req.flash("error");
//     next();
// })

passport.use(new LocalStrategy(
    function(username, password, done) {
        console.log("username in LocalStrategy: ", username)
        User.findOne({username: username}, function(err, user) {
            if (err) {return done(err); }
            if (!user || user === null) {
                console.log("User doesn't exist")
                return done(null, false, {message: "Incorrect username."});
            }
            if (!user.validPassword(password)) {
                console.log("Password is wrong")
                return done(null, false, {message: "Incorrect password."});
            }
            return done(null, user);
            });
        }
    ));

router.post("/", 
    passport.authenticate('local', 
        {
            session: true,
            failureFlash: "Not Welcome",
            successFlash: "Welcome!",
        }), 
        function(req, res) {
            console.log('showing authenticated in router.post')
            /* We will have a user.privilege to filted users by db access */
            res.send({ 
                redirectURI: "/home",
                username: req.user.username,
                privilege: req.user.privilege,
                logged: true
            })
            
    });

const isAuthenticated = (req, res, next) => {
    if(req.user)
        return next();
    else
        return res.status(401).json({
            error: 'User not authenticated'
        })
    
    }

router.get("/", isAuthenticated, function(req,res) {
    res.status(200).json({
        status: "OK"
    })
})

module.exports = router;