import { combineReducers } from "redux";
import gameReducer from "./gameReducer"
import displayReducer from "./displayReducer"
import playerReducer from "./playerReducer"
import statsReducer from "./statsReducer"

export default combineReducers({
    games: gameReducer,
    display: displayReducer,
    players: playerReducer,
    stats: statsReducer
})