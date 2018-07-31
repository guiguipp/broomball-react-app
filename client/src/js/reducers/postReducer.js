import { FETCH_GAMES, NEW_GAME } from '../actions/types';

const initialState = {
    games: [],
    game: {}
}

export default function(state = initialState, action) {
    console.log("Reducer executing")
    console.log("Action.type in the reducer: ", action.type)
    switch(action.type) {
        case FETCH_GAMES:
        return {
            ...state,
            games: action.payload
        }
        default: 
        return state;
    }
}