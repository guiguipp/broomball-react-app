import { combineReducers } from "redux";
import gameReducer from "./gameReducer"
import displayReducer from "./displayReducer"
import playerReducer from "./playerReducer"

export default combineReducers({
    games: gameReducer,
    display: displayReducer,
    players: playerReducer
})