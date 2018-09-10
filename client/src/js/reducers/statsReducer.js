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
    SET_DATE_RANGE,
    SET_CHART_DATA,
    TOOGLE_CHART_OPTIONS
    } from '../actions/types';

import _ from "underscore"
const moment = require("moment");

const initialState = {
    visibility: "hidden",
    message: "Teams have not been drafted for this team yet. Please come back later!",
    gamesForRecords: [],
    pastGamesFromAPI: [],
    reducedGames: [],
    gameVisibility: [],
    selectedGames: [],
    unselectedGames: [],
    selectedPlayers: [],
    unselectedPlayers: [],
    datePickers: "visible",
    listOfGames: "hidden",
    listOfPlayers: "hidden", 
    sortOptionsDisplay: "hidden",
    playerRecords: [],
    arrayOfTenBuckersID: [],
    sortingOptions:
        {
            alphaDesc: "active",
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
            azTab: "selected_tab",
            gamesTab: "unselected_tab",
            winsTab: "unselected_tab",
            goalsTab: "unselected_tab",
            gpgTab: "unselected_tab",
            assistsTab: "unselected_tab",
            apgTab: "unselected_tab",
        },
    chartingOptions: {
        azTab: "unselected_chart",
        gamesTab: "unselected_chart",
        winsTab: "unselected_chart",
        goalsTab: "unselected_chart",
        gpgTab: "unselected_chart",
        assistsTab: "unselected_chart",
        apgTab: "unselected_chart",
        },
    chartData: {
        labels: [],
        datasets: [
            {
                label: "Goals",
                data: [],
                backgroundColor: 'rgba(255,99,132,0.6)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
            },
            {
                label: "Assists",
                data: [],
                backgroundColor: 'rgba(54,162,235,0.6)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
            },
            {
                label: "Games",
                data: [],
                backgroundColor: 'rgba(255,206,86,0.6)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
            },
            {
                label: "Wins",
                data: [],
                backgroundColor: 'rgba(75,192,192,0.6)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
            },
            {
                label: "GPG",
                data: [],
                backgroundColor: 'rgba(75,192,192,0.6)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
            },
            {
                label: "APG",
                data: [],
                backgroundColor: 'rgba(255,99,132,0.6)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
            },
        ]
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
            pastGamesFromAPI: _.sortBy(action.payload.games.filter(game => game._id < moment().format("YYYY-MM-DD")),"_id").reverse(),
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
            unselectedGames: state.unselectedGames.filter(game => game._id !== action.payload._id),
            sortingOptions: initialState.sortingOptions
        }

        case REMOVE_GAME_FROM_SELECTED:
        return {
            ...state,
            selectedGames: state.selectedGames.filter(game => game._id !== action.payload._id),
            unselectedGames: [...state.unselectedGames, action.payload],
            sortingOptions: initialState.sortingOptions
        }

        case ADD_PLAYER_TO_SELECTED:
        return {
            ...state,
            selectedPlayers: [...state.selectedPlayers, action.payload.selected],
            unselectedPlayers: state.unselectedPlayers.filter(player => player._id !== action.payload.selected._id),
            sortingOptions: initialState.sortingOptions,
        }

        case REMOVE_PLAYER_FROM_SELECTED:
        return {
            ...state,
            selectedPlayers: state.selectedPlayers.filter(player => player._id !== action.payload.selected._id),
            unselectedPlayers: [...state.unselectedPlayers, action.payload.selected],
            sortingOptions: initialState.sortingOptions
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
            playerRecords: _.sortBy([...state.playerRecords, action.payload],"name")
        }

        case REMOVE_PLAYER_RECORDS:
        return {
            ...state, 
            playerRecords: _.sortBy(state.playerRecords.filter(player => player._id !== action.payload._id),"name")
        }

        case REPLACE_PLAYERS_RECORDS:
        return {
            ...state, 
            playerRecords: _.sortBy(action.payload, "name")
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
            playerRecords: state.playerRecords.filter(player => player.gamesPlayed === "N/A").concat(_.sortBy(state.playerRecords.filter(player => player.gamesPlayed !== "N/A"), "gamesPlayed"))
        }

        case SORT_GAMES_DESC:
        return {
            ...state,
            sortingOptions: action.payload,
            playerRecords: state.playerRecords.filter(player => player.gamesPlayed === "N/A").concat(_.sortBy(state.playerRecords.filter(player => player.gamesPlayed !== "N/A"), "gamesPlayed").reverse())
        }

        case SORT_WINS_ASC:
        return {
            ...state,
            sortingOptions: action.payload,
            playerRecords: state.playerRecords.filter(player => player.winPercent === "N/A").concat(_.sortBy(state.playerRecords.filter(player => player.winPercent !== "N/A"), "winPercent"))
        }

        case SORT_WINS_DESC:
        return {
            ...state,
            sortingOptions: action.payload,
            playerRecords: state.playerRecords.filter(player => player.winPercent === "N/A").concat(_.sortBy(state.playerRecords.filter(player => player.winPercent !== "N/A"), "winPercent").reverse())
        }

        case SORT_GOALS_ASC:
        return {
            ...state,
            sortingOptions: action.payload,
            playerRecords: state.playerRecords.filter(player => player.goals === "N/A").concat(_.sortBy(state.playerRecords.filter(player => player.goals !== "N/A"), "goals"))
        }
        
        case SORT_GOALS_DESC:
        return {
            ...state,
            sortingOptions: action.payload,
            playerRecords: state.playerRecords.filter(player => player.goals === "N/A").concat(_.sortBy(state.playerRecords.filter(player => player.goals !== "N/A"), "goals").reverse())
        }
        
        case SORT_ASSISTS_ASC:
        return {
            ...state,
            sortingOptions: action.payload,
            playerRecords: state.playerRecords.filter(player => player.assists === "N/A").concat(_.sortBy(state.playerRecords.filter(player => player.assists !== "N/A"), "assists"))            
        }
        
        case SORT_ASSISTS_DESC:
        return {
            ...state,
            sortingOptions: action.payload,
            playerRecords: state.playerRecords.filter(player => player.assists === "N/A").concat(_.sortBy(state.playerRecords.filter(player => player.assists !== "N/A"), "assists").reverse())        }

        case SORT_GPG_ASC:
        return {
            ...state,
            sortingOptions: action.payload,
            playerRecords: state.playerRecords.filter(player => player.gpg === "N/A").concat(_.sortBy(state.playerRecords.filter(player => player.gpg !== "N/A"), "gpg"))
        }

        case SORT_GPG_DESC:
        return {
            ...state,
            sortingOptions: action.payload,
            playerRecords: state.playerRecords.filter(player => player.gpg === "N/A").concat(_.sortBy(state.playerRecords.filter(player => player.gpg !== "N/A"), "gpg").reverse())
        }

        case SORT_APG_ASC:
        return {
            ...state,
            sortingOptions: action.payload,
            playerRecords: state.playerRecords.filter(player => player.apg === "N/A").concat(_.sortBy(state.playerRecords.filter(player => player.apg !== "N/A"), "apg"))
        }

        case SORT_APG_DESC:
        return {
            ...state,
            sortingOptions: action.payload,
            playerRecords: state.playerRecords.filter(player => player.apg === "N/A").concat(_.sortBy(state.playerRecords.filter(player => player.apg !== "N/A"), "apg").reverse())
        }

        case SET_DATE_RANGE:
        return {
            ...state,
            dateRange: action.payload,
            gamesForRecords: state.gamesForRecords.filter(game => game._id >= action.payload.from && game._id <= action.payload.to),
        }

        case SET_CHART_DATA:
        return {
            ...state,
            chartData: action.payload,
        }

        case TOOGLE_CHART_OPTIONS:
        return {
            ...state,
            chartingOptions: action.payload,
        }

        default:
        return state;
    }
}