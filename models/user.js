const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");
const bcrypt = require('bcryptjs');

moment().format();

const userSchema = new Schema({
    username: { type: String, index: {unique: true, dropDups: true}, required: true },
    password: { type: String, required: false },
    privilege: { type: String, required: false },
    email: { type: String, required: true },
    connected: {type: Boolean, required: false},
    created: {type: Date, required: true, default: moment()},
    updated: {type: Date, required: false, default: moment()}
    });
    userSchema.methods = {
        checkPassword: function (inputPassword) {
            return bcrypt.compareSync(inputPassword, this.password)
            },
        validPassword: function (password) {
            return(this.password === password )
            },
        hashPassword: plainTextPassword => {
            return bcrypt.hashSync(plainTextPassword, 10)
            }
    }

    // Define pre-hooks for the save method
    userSchema.pre('save', function (next) {
        if (!this.password) {
        console.log('models/user.js =======NO PASSWORD PROVIDED=======')
        next()
        } else {
        console.log('models/user.js hashPassword in pre save');
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(this.local.password, salt);
        this.local.password = hash;
        next();
        }
    })    
    
const User = mongoose.model("User", userSchema);
module.exports = User;

