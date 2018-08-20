import { FETCH_GAMES, NEW_GAME, DELETE_GAME, GET_GAME } from '../actions/types';
import _ from "underscore"

const initialState = {
    games: [],
    newGame: {},
    deletedGame: {},
    gameInfo: {
        goals: 0,
        assists: 0,
        win: false,
        pickCaptain1: 0,
        pickCaptain2: 0,
        available: true,
        team: "N/A"
    },
    draft: {}
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
            ...state,
            newGame: action.payload,
            games: _.sortBy([...state.games, action.payload], "game_date")
        }

        case GET_GAME:
        return {
            ...state,
            draft: action.payload
        }

        case DELETE_GAME:
        return {
            ...state,
            deletedGame: action.payload,
            games: state.games.filter(game => game._id !== action.payload._id)
            }
        default: 
        return state;
    }
}