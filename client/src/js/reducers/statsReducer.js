import { 
    SHOW_GAMES_TO_STATS, 
    GET_GAMES_AND_TRANSFORM, 
    SET_YEARS_VISIBILITIES, 
    ADD_GAME_TO_SELECTED,
    REMOVE_GAME_FROM_SELECTED,
    ADD_PLAYER_TO_SELECTED,
    REMOVE_PLAYER_FROM_SELECTED,
    TOGGLE_RECORDS_VIEWS,
    PLAYER_RECORDS
    } from '../actions/types';

const initialState = {
    visibility: "hidden",
    message: "Teams have not been drafted for this team yet. Please come back later!",
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
    playerRecords: []
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
            selectedPlayers: [...state.selectedPlayers, action.payload],
            unselectedPlayers: state.unselectedPlayers.filter(player => player._id !== action.payload._id)
        }

        case REMOVE_PLAYER_FROM_SELECTED:
        return {
            ...state,
            selectedPlayers: state.selectedPlayers.filter(player => player._id !== action.payload._id),
            unselectedPlayers: [...state.unselectedPlayers, action.payload]
        }
        
        case TOGGLE_RECORDS_VIEWS:
        return {
            ...state,
            datePickers: action.payload.dates,
            listOfGames: action.payload.games,
            listOfPlayers: action.payload.players, 
            sortOptionsDisplay: action.payload.sort
        }

        case PLAYER_RECORDS:
        return {
            ...state, 
            playerRecords: action.payload
        }

        default:
        return state;
    }
}