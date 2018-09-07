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
    REMOVE_PLAYER_RECORDS,
    REPLACE_PLAYERS_RECORDS,
    SORT_AZ_ASC,
    SORT_AZ_DESC,
    SORT_GAMES_ASC,
    SORT_GAMES_DESC,
    SORT_WINS_ASC,
    SORT_WINS_DESC,
    SORT_GOALS_ASC,
    SORT_GOALS_DESC, 
    SORT_GPG_ASC,
    SORT_GPG_DESC,
    SORT_ASSISTS_ASC,
    SORT_ASSISTS_DESC,
    SORT_APG_ASC,
    SORT_APG_DESC,
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
    sortingOptions:
        {
            alphaDesc: "inactive",
            alphaAsc: "inactive",
            gamesDesc: "inactive",
            gamesAsc: "inactive",
            goalsDesc: "inactive",
            goalsAsc: "inactive",
            gpgDesc: "inactive",
            gpgAsc: "inactive",
            winsDesc: "inactive",
            winsAsc: "inactive",
            assistsDesc: "inactive",
            assistsAsc: "inactive",
            apgDesc: "inactive",
            apgAsc: "inactive",
            azTab: "unselected_tab",
            gamesTab: "unselected_tab",
            winsTab: "unselected_tab",
            goalsTab: "unselected_tab",
            gpgTab: "unselected_tab",
            assistsTab: "unselected_tab",
            apgTab: "unselected_tab",
        }
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

        case REPLACE_PLAYERS_RECORDS:
        return {
            ...state, 
            playerRecords: action.payload
        }


        case SORT_AZ_ASC:
        return {
            ...state,
            sortingOptions: action.payload,
            playerRecords: _.sortBy(state.playerRecords, "name").reverse() // we need to do this because names are capitalized
        }

        case SORT_AZ_DESC:
        return {
            ...state,
            sortingOptions: action.payload,
            playerRecords: _.sortBy(state.playerRecords, "name")
        }

        case SORT_GAMES_ASC:
        return {
            ...state,
            sortingOptions: action.payload,
            playerRecords: _.sortBy(state.playerRecords, "gamesPlayed")
        }

        case SORT_GAMES_DESC:
        return {
            ...state,
            sortingOptions: action.payload,
            playerRecords: _.sortBy(state.playerRecords, "gamesPlayed").reverse()
        }

        case SORT_WINS_ASC:
        return {
            ...state,
            sortingOptions: action.payload,
            playerRecords: _.sortBy(state.playerRecords, "winPercent")
        }

        case SORT_WINS_DESC:
        return {
            ...state,
            sortingOptions: action.payload,
            playerRecords: _.sortBy(state.playerRecords, "winPercent").reverse()
        }

        case SORT_GOALS_ASC:
        return {
            ...state,
            sortingOptions: action.payload,
            playerRecords: _.sortBy(state.playerRecords, "goals")
        }

        case SORT_GOALS_DESC:
        return {
            ...state,
            sortingOptions: action.payload,
            playerRecords: _.sortBy(state.playerRecords, "goals").reverse()
        }
        
        case SORT_GPG_ASC:
        return {
            ...state,
            sortingOptions: action.payload,
            playerRecords: _.sortBy(state.playerRecords, "gpg")
        }

        case SORT_GPG_DESC:
        return {
            ...state,
            sortingOptions: action.payload,
            playerRecords: _.sortBy(state.playerRecords, "gpg").reverse()
        }

        case SORT_ASSISTS_ASC:
        return {
            ...state,
            sortingOptions: action.payload,
            playerRecords: _.sortBy(state.playerRecords, "assists")
        }

        case SORT_ASSISTS_DESC:
        return {
            ...state,
            sortingOptions: action.payload,
            playerRecords: _.sortBy(state.playerRecords, "assists").reverse()
        }

        case SORT_APG_ASC:
        return {
            ...state,
            sortingOptions: action.payload,
            playerRecords: _.sortBy(state.playerRecords, "apg")
        }

        case SORT_APG_DESC:
        return {
            ...state,
            sortingOptions: action.payload,
            playerRecords: _.sortBy(state.playerRecords, "apg").reverse()
        }


        default:
        return state;
    }
}