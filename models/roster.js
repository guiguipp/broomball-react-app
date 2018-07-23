const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");
moment().format();

const rosterSchema = new Schema({
    _id: {type: String, required: true },
    date: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Game"
    },
    game_date: {type: String, required: true},
    player_name: { type: String, required: true },
    goals: { type: Number, required: false, default: 0 },
    assists: { type: Number, required: false, default: 0 },
    win: { type: Boolean, required: false},
    pickOrderCap1: { type: Number, required: false},
    pickOrderCap2: { type: Number, required: false},
    availability:{ type: Boolean, required: false, default: true},
    team: { type: String, enumValue: ["Dark", "White", "None"], required: true, default: "None"},  
    lock_status: { type: Boolean, required: true, default: false},
    created: {type: Date, required: true, default: moment()},
    updated: {type: Date, required: true, default: moment()},
    });
    
const Roster = mongoose.model("Roster", rosterSchema);
module.exports = Roster;