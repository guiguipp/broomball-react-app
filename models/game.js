const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");
moment().format();

const gameSchema = new Schema({
    _id: {type: String, required: true },
    game_date: { type: Date, required: true },
    goals_dark: { type: Number, required: false, default: 0 },
    goals_white: { type: Number, required: false, default: 0 },
    captain1Picks_ready: { type: Boolean, required: false, default: false},
    captain2Picks_ready: { type: Boolean, required: false, default: false},
    lock_status: { type: Boolean, required: false, default: false},
    created: {type: Date, required: true, default: moment()},
    updated: {type: Date, required: true, default: moment()},
    });
    
const Game = mongoose.model("Game", gameSchema);
module.exports = Game;