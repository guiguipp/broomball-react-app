import { 
    SHOW_GAMES_TO_STATS, 
    GET_GAMES_AND_TRANSFORM,
    GET_GAMES_IN_TIMESPAN, 
    SET_YEARS_VISIBILITIES, 
    ADD_GAME_TO_SELECTED,
    REMOVE_GAME_FROM_SELECTED,
    ADD_PLAYER_TO_SELECTED,
    REMOVE_PLAYER_FROM_SELECTED,
    TOGGLE_RECORDS_VIEWS,
    ADD_PLAYER_RECORDS,
    REMOVE_PLAYER_RECORDS
    } from '../actions/types';

import _ from "underscore"
const moment = require("moment");

const initialState = {
    visibility: "hidden",
    message: "Teams have not been drafted for this team yet. Please come back later!",
    gamesForRecords: [],
    reducedGames: [],
    gameVisibility: [],
    selectedGames: [],
    unselectedGames: [],
    selectedPlayers: [],
    unselectedPlayers: [],
    datePickers: "hidden",
    listOfGames: "hidden",
    listOfPlayers: "hidden", 
    sortOptionsDisplay: "hidden",
    playerRecords: [],
    arrayOfTenBuckersID: [],
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
            reducedGames: action.payload.game,
            gameVisibility: action.payload.visibility,
        }

        case GET_GAMES_IN_TIMESPAN:
        return {
            ...state,
            gamesForRecords: _.sortBy(action.payload.games.filter(game => game._id < moment().format("YYYY-MM-DD")),"_id").reverse(),
            arrayOfTenBuckersID: action.payload.allTenBuckers,
        }

        case SET_YEARS_VISIBILITIES:
        return {
            ...state, 
            gameVisibility: action.payload
        }

        case ADD_GAME_TO_SELECTED:
        return {
            ...state,
            selectedGames: [...state.selectedGames, action.payload],
            unselectedGames: state.unselectedGames.filter(game => game._id !== action.payload._id)
        }

        case REMOVE_GAME_FROM_SELECTED:
        return {
            ...state,
            selectedGames: state.selectedGames.filter(game => game._id !== action.payload._id),
            unselectedGames: [...state.unselectedGames, action.payload]
        }

        case ADD_PLAYER_TO_SELECTED:
        return {
            ...state,
            selectedPlayers: [...state.selectedPlayers, action.payload.selected],
            unselectedPlayers: state.unselectedPlayers.filter(player => player._id !== action.payload.selected._id)
        }

        case REMOVE_PLAYER_FROM_SELECTED:
        return {
            ...state,
            selectedPlayers: state.selectedPlayers.filter(player => player._id !== action.payload.selected._id),
            unselectedPlayers: [...state.unselectedPlayers, action.payload.selected]
        }
        
        case TOGGLE_RECORDS_VIEWS:
        return {
            ...state,
            datePickers: action.payload.dates,
            listOfGames: action.payload.games,
            listOfPlayers: action.payload.players, 
            sortOptionsDisplay: action.payload.sort
        }

        case ADD_PLAYER_RECORDS:
        return {
            ...state, 
            playerRecords: [...state.playerRecords, action.payload]
        }

        case REMOVE_PLAYER_RECORDS:
        return {
            ...state, 
            playerRecords: state.playerRecords.filter(player => player._id !== action.payload._id)
        }

        default:
        return state;
    }
}