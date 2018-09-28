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
    SORT_LOSSES_ASC,
    SORT_LOSSES_DESC,
    SORT_TIES_ASC,
    SORT_TIES_DESC,
    SORT_GOALS_ASC,
    SORT_GOALS_DESC, 
    SORT_GPG_ASC,
    SORT_GPG_DESC,
    SORT_ASSISTS_ASC,
    SORT_ASSISTS_DESC,
    SORT_APG_ASC,
    SORT_APG_DESC,
    SET_DATE_RANGE,
    // SET_CHART_DATA,
    TOGGLE_SELECT_ALL,
    BATCH_CARD_UPDATE,
    BATCH_CHART_UPDATE,
    BATCH_UNSELECT,
    // TOGGLE_POSITIONS,
    TOGGLE_PLAYER_MODAL,
    BATCH_GAMES,
    UNSELECT_ALL_GAMES, 
    FILTER_PLAYER_RECORDS
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
    chartDisplay: "hidden",
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
            lossesDesc: "inactive",
            lossesAsc: "inactive",
            tiesDesc: "inactive",
            tiesAsc: "inactive",
            assistsDesc: "inactive",
            assistsAsc: "inactive",
            apgDesc: "inactive",
            apgAsc: "inactive",
            azTab: "selected_tab",
            gamesTab: "unselected_tab",
            winsTab: "unselected_tab",
            lossesTab: "unselected_tab",
            tiesTab: "unselected_tab",
            goalsTab: "unselected_tab",
            gpgTab: "unselected_tab",
            assistsTab: "unselected_tab",
            apgTab: "unselected_tab",
        },
    chartingOptions: {
        gamesTab: "selected_chart_games",
        winsTab: "selected_chart_wins",
        goalsTab: "selected_chart_goals",
        gpgTab: "selected_chart_gpg",
        assistsTab: "selected_chart_assists",
        apgTab: "selected_chart_apg",
        },
    chartData: {
        labels: [],
        datasets: [
            {
                label: "Goals",
                data: [],
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(172,173,178,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255, 99, 132, 0.6)',
                hoverBorderColor: 'rgba(255, 99, 132, 0.6)',
            },
            {
                label: "Assists",
                data: [],
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(172,173,178,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(54, 162, 235, 0.6)',
                hoverBorderColor: 'rgba(54, 162, 235, 0.6)',
                barThickness: 15,
            },
            {
                label: "Games",
                data: [],
                backgroundColor: 'rgba(255, 206, 86, 0.6)',
                borderColor: 'rgba(172,173,178,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255, 206, 86, 0.6)',
                hoverBorderColor: 'rgba(255, 206, 86, 0.6)',
                barThickness: 15,
            },
            {
                label: "Wins (%)",
                data: [],
                backgroundColor: 'rgba(75,192,192,0.6)',
                borderColor: 'rgba(172,173,178,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75,192,192,0.6)',
                hoverBorderColor: 'rgba(75,192,192,0.6)',
                barThickness: 15,
            },
            {
                label: "Losses (%)",
                data: [],
                backgroundColor: '#d3b8ae',
                borderColor: 'rgba(172,173,178,1)',
                borderWidth: 1,
                hoverBackgroundColor: '#d3b8ae',
                hoverBorderColor: '#d3b8ae',
                barThickness: 15,
            },
            {
                label: "Ties (%)",
                data: [],
                backgroundColor: '#ff8a65',
                borderColor: 'rgba(172,173,178,1)',
                borderWidth: 1,
                hoverBackgroundColor: '#ff8a65',
                hoverBorderColor: '#ff8a65',
                barThickness: 15,
            },
            {
                label: "GPG",
                data: [],
                backgroundColor: 'rgba(153,102,255,0.6)',
                borderColor: 'rgba(172,173,178,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(153,102,255,0.6)',
                hoverBorderColor: 'rgba(153,102,255,0.6)',
                barThickness: 15,
            },
            {
                label: "APG",
                data: [],
                backgroundColor: 'rgba(255, 159, 64, 0.6)',
                borderColor: 'rgba(172,173,178,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255, 159, 64, 0.6)',
                hoverBorderColor: 'rgba(255, 159, 64, 0.6)',
                options: {barThickness: 100},
            },
        ]
    },
    memberSelection: "unselected_member",
    tenBuckerSelection: "unselected_non_member",
    selectors: {
        forwardSelection: "unselected_forward",
        goalieSelection: "unselected_goalie",
        defenseSelection: "unselected_defense",
        positionVisibility: "all"
        },
    playerModal: false,
    playerModalData: {},
    allGamesSelection: "unselected_game"
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
            sortOptionsDisplay: action.payload.sort,
            chartDisplay: action.payload.chart
        }

        case ADD_PLAYER_RECORDS:
        return {
            ...state, 
            playerRecords: _.sortBy([...state.playerRecords, action.payload],"name"),
            filteredPlayerRecords: _.sortBy([...state.playerRecords, action.payload],"name")
        }

        case REMOVE_PLAYER_RECORDS:
        return {
            ...state, 
            playerRecords: _.sortBy(state.playerRecords.filter(player => player._id !== action.payload._id),"name"),
            filteredPlayerRecords: _.sortBy(state.playerRecords.filter(player => player._id !== action.payload._id),"name")
        }

        case REPLACE_PLAYERS_RECORDS:
        return {
            ...state, 
            playerRecords: _.sortBy(action.payload, "name"),
            filteredPlayerRecords: _.sortBy(action.payload, "name"),
        }

        case SORT_AZ_ASC:
        return {
            ...state,
            sortingOptions: action.payload,
            filteredPlayerRecords: _.sortBy(state.filteredPlayerRecords, "name").reverse()
        }

        case SORT_AZ_DESC:
        return {
            ...state,
            sortingOptions: action.payload,
            filteredPlayerRecords: _.sortBy(state.filteredPlayerRecords, "name"),
        }

        case SORT_GAMES_ASC:
        return {
            ...state,
            sortingOptions: action.payload,
            filteredPlayerRecords: _.sortBy(state.playerRfilteredPlayerRecordsecords.filter(player => player.gamesPlayed !== "N/A"), "gamesPlayed")
        }

        case SORT_GAMES_DESC:
        return {
            ...state,
            sortingOptions: action.payload,
            filteredPlayerRecords: _.sortBy(state.filteredPlayerRecords.filter(player => player.gamesPlayed !== "N/A"), "gamesPlayed").reverse()
        }

        case SORT_WINS_ASC:
        return {
            ...state,
            sortingOptions: action.payload,
            filteredPlayerRecords: _.sortBy(state.filteredPlayerRecords.filter(player => player.winPercent !== "N/A"), "winPercent")
        }

        case SORT_WINS_DESC:
        return {
            ...state,
            sortingOptions: action.payload,
            filteredPlayerRecords: _.sortBy(state.filteredPlayerRecords.filter(player => player.winPercent !== "N/A"), "winPercent").reverse(),
        }

        case SORT_LOSSES_ASC:
        return {
            ...state,
            sortingOptions: action.payload,
            filteredPlayerRecords: _.sortBy(state.filteredPlayerRecords.filter(player => player.lossPercent !== "N/A"), "lossPercent")
        }

        case SORT_LOSSES_DESC:
        return {
            ...state,
            sortingOptions: action.payload,
            filteredPlayerRecords: _.sortBy(state.filteredPlayerRecords.filter(player => player.lossPercent !== "N/A"), "lossPercent").reverse(),
        }

        case SORT_TIES_ASC:
        return {
            ...state,
            sortingOptions: action.payload,
            filteredPlayerRecords: _.sortBy(state.filteredPlayerRecords.filter(player => player.tiePercent !== "N/A"), "tiePercent")
        }

        case SORT_TIES_DESC:
        return {
            ...state,
            sortingOptions: action.payload,
            filteredPlayerRecords: _.sortBy(state.filteredPlayerRecords.filter(player => player.tiePercent !== "N/A"), "tiePercent").reverse(),
        }

        case SORT_GOALS_ASC:
        return {
            ...state,
            sortingOptions: action.payload,
            filteredPlayerRecords: _.sortBy(state.filteredPlayerRecords.filter(player => player.goals !== "N/A"), "goals"),
        }
        
        case SORT_GOALS_DESC:
        return {
            ...state,
            sortingOptions: action.payload,
            filteredPlayerRecords: _.sortBy(state.filteredPlayerRecords.filter(player => player.goals !== "N/A"), "goals").reverse(),
        }
        
        case SORT_ASSISTS_ASC:
        return {
            ...state,
            sortingOptions: action.payload,
            filteredPlayerRecords: _.sortBy(state.filteredPlayerRecords.filter(player => player.assists !== "N/A"), "assists"),
        }
        
        case SORT_ASSISTS_DESC:
        return {
            ...state,
            sortingOptions: action.payload,
            filteredPlayerRecords: _.sortBy(state.filteredPlayerRecords.filter(player => player.assists !== "N/A"), "assists").reverse(),
        }


        case SORT_GPG_ASC:
        return {
            ...state,
            sortingOptions: action.payload,
            filteredPlayerRecords: _.sortBy(state.filteredPlayerRecords.filter(player => player.gpg !== "N/A"), "gpg")
        }

        case SORT_GPG_DESC:
        return {
            ...state,
            sortingOptions: action.payload,
            filteredPlayerRecords: _.sortBy(state.filteredPlayerRecords.filter(player => player.gpg !== "N/A"), "gpg").reverse(),
        }

        case SORT_APG_ASC:
        return {
            ...state,
            sortingOptions: action.payload,
            filteredPlayerRecords: _.sortBy(state.filteredPlayerRecords.filter(player => player.apg !== "N/A"), "apg"),
        }

        case SORT_APG_DESC:
        return {
            ...state,
            sortingOptions: action.payload,
            filteredPlayerRecords: _.sortBy(state.filteredPlayerRecords.filter(player => player.apg !== "N/A"), "apg").reverse(),
        }

        case SET_DATE_RANGE:
        return {
            ...state,
            dateRange: action.payload,
            gamesForRecords: state.pastGamesFromAPI.filter(game => game._id >= action.payload.from && game._id <= action.payload.to)
        }
        /*
        case SET_CHART_DATA:
        return {
            ...state,
            // chartData: action.payload,
            // curatedChartData: action.payload,
            // chartingOptions: initialState.chartingOptions
        }*/
        
        case TOGGLE_SELECT_ALL:
        return {
            ...state,
            memberSelection: action.payload.player === "member" ? action.payload.memberSelection : state.memberSelection,
            tenBuckerSelection: action.payload.player !== "member" ? action.payload.tenBuckerSelection : state.tenBuckerSelection,
        }
        
        case BATCH_CARD_UPDATE:
        return {
            ...state,
            // playerRecords: _.sortBy(action.payload.concat(state.playerRecords), "name"),
            playerRecords: action.payload.concat(state.playerRecords.filter(player => player._id !== action.payload._id))
        }

        case BATCH_CHART_UPDATE:
        return {
            ...state,
            chartData: action.payload,
            curatedChartData: action.payload,
        }

        case BATCH_UNSELECT:
        return {
            ...state,
            playerRecords: _.sortBy(state.playerRecords.filter(player => player.membershipStatus !== action.payload), "name")
        }

        // case TOGGLE_POSITIONS:
        // return {
        //     ...state, 
        //     selectors: action.payload
        // }

        case TOGGLE_PLAYER_MODAL:
        return {
            ...state, 
            playerModal: action.payload.status,
            playerModalData: action.payload.data
        }
        case BATCH_GAMES:
        return {
            ...state, 
            allGamesSelection: action.payload === "unselected_game" ? "selected_game" : "unselected_game"
        }

        case UNSELECT_ALL_GAMES:
        return {
            ...state, 
            selectedGames: initialState.selectedGames,
            unselectedGames: state.pastGamesFromAPI,
            allGamesSelection: "unselected_game"
        }

        case FILTER_PLAYER_RECORDS:
        return {
            ...state,
            sortingOptions: initialState.sortingOptions,
            filteredPlayerRecords: action.payload.operator === "only" ? _.sortBy(state.playerRecords.filter(player => player.preferredPosition === action.payload.playerType),"name") : _.sortBy(state.playerRecords.filter(player => player.preferredPosition !== action.payload.playerType),"name") 
        }
        default:
        return state;
    }
}