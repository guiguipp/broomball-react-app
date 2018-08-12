import { FETCH_PLAYERS, EDIT_PLAYER, ADD_PLAYER, DELETE_PLAYER, SHOW_TAB1, SHOW_TAB2, EDIT_FORM, UPDATE_FIELD } from '../actions/types';
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
    tab1: "show",
    tab2: "hide",
    panel1: "visible",
    panel2: "hidden",
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
        
        case SHOW_TAB1:
        return {
            ...state,
            tab1: "show",
            panel1: "visible",
            tab2: "hide",
            panel2: "hidden",
            formMode: "Add",
            player: initialState.player,
        }

        case SHOW_TAB2:
        return {
            ...state,
            tab2: "show",
            panel2: "visible",
            tab1: "hide",
            panel1: "hidden",
            formMode: "Add"
        }

        case EDIT_FORM:
        return {
            ...state,
            formMode: "Edit",
            tab2: "show",
            panel2: "visible",
            tab1: "hide",
            panel1: "hidden",
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