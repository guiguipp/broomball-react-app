import { SHOW_GAMES_TO_STATS } from '../actions/types';
// const moment = require("moment");

const initialState = {
    visibility: "hidden",
    message: "Teams have not been drafted for this team yet. Please come back later!"
    }

export default function(state = initialState, action) {
    switch(action.type) {
        case SHOW_GAMES_TO_STATS:
        return {
            ...state,
            visibility: "visible",
        }
            
        default:
        return state;
    }
}