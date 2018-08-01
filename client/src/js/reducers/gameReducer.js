import { FETCH_GAMES, NEW_GAME, DELETE_GAME } from '../actions/types';

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
        console.log("%cGames in the gameReducer still need be sorted by id : ", "color: red", state)
        return {
            newGame: action.payload,
            games: [...state.games, action.payload]
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