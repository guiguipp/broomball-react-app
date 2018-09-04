import { SHOW_GAMES_TO_STATS, GET_GAMES_AND_TRANSFORM } from '../actions/types';

const initialState = {
    visibility: "hidden",
    message: "Teams have not been drafted for this team yet. Please come back later!",
    reducedGames: []
    }

export default function(state = initialState, action) {
    switch(action.type) {
        case SHOW_GAMES_TO_STATS:
        return {
            ...state,
            visibility: "visible",
        }
            
        case GET_GAMES_AND_TRANSFORM:
        return {
            ...state,
            reducedGames: action.payload,
        }

        default:
        return state;
    }
}