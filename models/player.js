const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");
moment().format();

const playerSchema = new Schema({
    name: { type: String, unique: true, required: true },
    first_name: { type: String, required: false },
    last_name: { type: String, required: false },
    player_level: { type: String, required: false},
    preferred_position: { type: String, required: false},
    player_status: { type: String, required: true, default: "ten_bucker"},
    created: {type: Date, required: true, default: moment()},
    updated: {type: Date, required: true, default: moment()},
    email: {type: String, required: false}
    });
    
    const Player = mongoose.model("Player", playerSchema);
module.exports = Player;