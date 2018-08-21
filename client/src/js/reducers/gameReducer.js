import { FETCH_GAMES, NEW_GAME, DELETE_GAME, GET_GAME, EDIT_GAME_INFO, SHOW_UNAVAILABLE_MEMBERS, SHOW_NON_MEMBERS, ADD_NON_MEMBER } from '../actions/types';
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
    visibility: "hidden",
    gameDate: "",
    draft: {},
    unavailableMembers: [],
    nonMembers: [],
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
            unavailableMembers: initialState.unavailableMembers,
            visibility: "visible",
            gameDate: action.payload._id,
            draft: action.payload
        }

        case EDIT_GAME_INFO:
        return {
            ...state,
            draft: action.payload.game,
            unavailableMembers: state.unavailableMembers.filter(player => player._id !== action.payload.player),
        }

        case DELETE_GAME:
        return {
            ...state,
            deletedGame: action.payload,
            games: state.games.filter(game => game._id !== action.payload._id)
            }

        case SHOW_UNAVAILABLE_MEMBERS:
        return {
            ...state,
            unavailableMembers: state.draft.players.filter(player => player.gameInfo.available !== true), 
        }
        
        case SHOW_NON_MEMBERS:
        return {
            ...state,
            nonMembers: action.payload
        }
        // still need a way to not show ten_buckers in the list of possible players to add if they are already 
        // in the list of players for a given game (aka: not based on the state, but on the data from DB)

        // also, when a ten_bucker has been added, and then removed, it's showing in the list of unavailable players 
        // (which is unintented, but might not be a bad thing...?)

        case ADD_NON_MEMBER:
        return {
            ...state,
            draft: action.payload.players,
            nonMembers: state.nonMembers.filter(player => player._id !== action.payload.player._id),
        }
        default: 
        return state;
    }
}