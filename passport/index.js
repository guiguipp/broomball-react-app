const passport = require('passport');
const LocalStrategy = require('./localStrategy');
const User = require('../models/user');

passport.serializeUser((user, done) => {
    console.log('Passport Serialize in passport > index');
    // console.log(user)
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    console.log('Deserialize in passport > index');
    User.findById(
        id,
        (err, user) => {
            if(err) {return done(err)}
            console.log('======= DESERIALIZE USER CALLED ======')
            console.log(user);
            console.log('--------------');
            done(null, user);
            },
        );
    });

// ==== Register Strategies ====
passport.use('local', LocalStrategy);
module.exports = passport;
