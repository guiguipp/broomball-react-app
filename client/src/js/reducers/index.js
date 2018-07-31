// ??
import { combineReducers } from "redux";
import postReducer from "./postReducer"

export default combineReducers({
    games: postReducer
})

// ?? 
/*
import { ADD_GAME } from "../constants/action-types";

const initialState = {
    games: []
    };

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_GAME:
        return {...state, games: [...state.games, action.payload]};
        
        case REMOVE_GAME:
        return {...state, games: [...state.games, action.payload]};
        
        default:
        return state;
        }
    };
export default rootReducer;
*/