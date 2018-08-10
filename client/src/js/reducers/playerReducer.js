import { FETCH_PLAYERS, ADD_PLAYER, DELETE_PLAYER, FORM_UPDATE_VALUE, FORM_RESET } from '../actions/types';
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
    test: ""
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
            player: action.payload,
            players: _.sortBy([...state.players, action.payload], "name")
        }

        case DELETE_PLAYER:
        return {
            ...state,
            deletedPlayer: action.payload,
            players: state.players.filter(player => player._id !== action.payload._id)
        }

        case FORM_UPDATE_VALUE:
        console.log("Updating happening in the reducer")
        return {
            ...state,
            player: {
                    ...state.player,
                    name: action.payload}
            }
        
        case FORM_RESET:
        return initialState;
        
        default: 
        return state;
    }
}