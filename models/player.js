const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playerSchema = new Schema({
    name: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    player_level: { type: String, required: true},
    preferred_position: { type: String, required: true},
    player_status: { type: String, required: true},
    email: {type: String}
    });
    
    const Player = mongoose.model("Player", playerSchema);
module.exports = Player;