import { FETCH_GAMES, NEW_GAME, DELETE_GAME } from '../actions/types';
import _ from "underscore"

const initialState = {
    games: [],
    newGame: {},
    deletedGame: {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        case FETCH_GAMES:
        return {
            ...state,
            games: action.payload
        }
        
        case NEW_GAME:
        return {
            newGame: action.payload,
            games: _.sortBy([...state.games, action.payload], "game_date")
        }

        case DELETE_GAME:
        return {
            deletedGame: action.payload,
            games: state.games.filter(game => game._id !== action.payload._id)
            }
        default: 
        return state;
    }
}