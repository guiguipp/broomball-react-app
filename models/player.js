const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");
moment().format();

const playerSchema = new Schema({
    name: { type: String, index: {unique: true, dropDups: true}, required: true },
    fullName: { type: String, required: false },
    preferredPosition: { type: String, required: false},
    membershipStatus: { type: String, required: true, default: "ten_bucker"},
    playerLevel: { type: String, required: false},
    email: {type: String, required: false},
    created: {type: Date, required: true, default: moment()},
    updated: {type: Date, required: true, default: moment()}
    });
    
    const Player = mongoose.model("Player", playerSchema);
module.exports = Player;

