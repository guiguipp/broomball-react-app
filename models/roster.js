const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");
moment().format();

const rosterSchema = new Schema({
    _id: {type: String, required: true },
    /*game_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Game"
    },*/
    game: { type: String, required: true },
    player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Player"
    },
    player_name: { type: String, required: true },
    goals: { type: Number, required: true, default: 0 },
    assists: { type: Number, required: true, default: 0 },
    win: { type: Boolean, required: true, default: false},
    pickOrderCap1: { type: Number, required: false},
    pickOrderCap2: { type: Number, required: false},
    available: { type: Boolean, required: true, default: true},
    team: { type: String, enumValue: ["Dark", "White", "None"], required: true, default: "None"},  
    lock_status: { type: Boolean, required: true, default: false},
    created: {type: Date, required: true, default: moment()},
    updated: {type: Date, required: true, default: moment()},
    });
    
const Roster = mongoose.model("Roster", rosterSchema);
module.exports = Roster;