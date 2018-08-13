import { FETCH_PLAYERS, EDIT_PLAYER, ADD_PLAYER, DELETE_PLAYER, SHOW_TAB, RESET_TABS, EDIT_FORM, UPDATE_FIELD } from '../actions/types';
import _ from "underscore"

const initialState = {
    players: [],
    player: {
        name: "",
        fullName: "",
        preferredPosition: "Forward",
        membershipStatus: "Member",
        email: "",
        playerLevel: "A+"
        },

    tabs: ["show","hide","hide"],
    panels: ["visible", "hidden", "hidden"],
    
    formMode: "Add"
    }

export default function(state = initialState, action) {
    switch(action.type) {
        case FETCH_PLAYERS:
        return {
            ...state,
            players: action.payload
        }

        case ADD_PLAYER:
        return {
            ...state,
            player: initialState.player,
            players: _.sortBy([...state.players, action.payload], "name")
        }

        case DELETE_PLAYER:
        return {
            ...state,
            deletedPlayer: action.payload,
            players: state.players.filter(player => player._id !== action.payload._id)
        }
        
        case EDIT_PLAYER:
        return {
            ...state,
            players: _.sortBy([action.payload, ...state.players.filter(player => player._id !== action.payload._id)], "name")
        }
        
        case SHOW_TAB:
        return {
            ...state,
            tabs: state.tabs.map((tab, index) => {if(index !== action.payload) {return tab = "hide"} else {return tab = "show"}}),
            panels: state.panels.map((panel, index) => {if(index !== action.payload) {return panel = "hidden"} else {return panel = "visible"}})
        }

        case RESET_TABS:
        return {
            ...state,
            tabs: initialState.tabs,
            panels: initialState.panels,
        }

        case EDIT_FORM:
        return {
            ...state,
            formMode: "Edit",
            tabs: ["hide","hide","show"],
            panels: ["hidden", "hidden", "visible"],
            player: action.payload
        }

        case UPDATE_FIELD:
        return {
            ...state,
            player: action.payload
        }        

        default: 
        return state;
    }
}