const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");
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
    userSchema.methods.validPassword = function (password) {
        return(this.password === password )
    }
    
    const User = mongoose.model("User", userSchema);
module.exports = User;

