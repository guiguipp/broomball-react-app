import { combineReducers } from "redux";
import gameReducer from "./gameReducer"
import displayReducer from "./displayReducer"

export default combineReducers({
    games: gameReducer,
    display: displayReducer
})