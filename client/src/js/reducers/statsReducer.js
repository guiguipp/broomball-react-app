import { 
    SHOW_GAMES_TO_STATS, 
    GET_GAMES_AND_TRANSFORM, 
    SET_YEARS_VISIBILITIES, 
    GET_GAMES_FOR_RECORDS,
    ADD_GAME_TO_SELECTED,
    REMOVE_GAME_FROM_SELECTED,
    TOGGLE_LIST_OF_GAMES,
    } from '../actions/types';

const initialState = {
    visibility: "hidden",
    message: "Teams have not been drafted for this team yet. Please come back later!",
    reducedGames: [],
    gameVisibility: [],
    allGames: [],
    selectedGames: [],
    unselectedGames: [],
    listOfGames: "hidden"
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

        case GET_GAMES_FOR_RECORDS:
        return {
            ...state,
            selectedGames: initialState.unselectedGames,
            allGames: action.payload,
            unselectedGames: action.payload
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
        case TOGGLE_LIST_OF_GAMES:
        return {
            ...state,
            listOfGames: action.payload
        }
        default:
        return state;
    }
}