import { 
    FETCH_GAMES, 
    NEW_GAME, 
    DELETE_GAME, 
    GET_GAME, 
    EDIT_GAME_INFO, 
    SHOW_UNAVAILABLE_MEMBERS, 
    HIDE_UNAVAILABLE_MEMBERS, 
    MAKE_UNAVAILABLE,
    MAKE_AVAILABLE,
    SHOW_NON_MEMBERS,
    HIDE_NON_MEMBERS, 
    ADD_NON_MEMBER, 
    LOCK_GAME_INFO,
    UNLOCK_GAME_INFO
} from '../actions/types';

import _ from "underscore"

const initialState = {
    games: [],
    newGame: {},
    deletedGame: {},
    gameInfo: {
        goals: 0,
        assists: 0,
        win: false,
        pickCaptain1: 0,
        pickCaptain2: 0,
        available: true,
        team: "N/A"
    },
    visibility: "hidden",
    gameDate: "",
    draft: {},
    unavailableMembers: [],
    nonMembers: [],
    playingTenBuckers: [],
    lockStatus: "visible",
    showingTenBuckers: "Show",
    showingUnavailable: "Show"
}

export default function(state = initialState, action) {
    switch(action.type) {
        case FETCH_GAMES:
        return {
            ...state,
            games: action.payload
        }
        
        case NEW_GAME:
        return {
            ...state,
            newGame: action.payload,
            games: _.sortBy([...state.games, action.payload], "game_date")
        }

        case GET_GAME:
        return {
            ...state,
            visibility: "visible",
            gameDate: action.payload._id,
            draft: action.payload,
            lockStatus: action.payload.lock_status === true ? "hidden" : "visible",
            unavailableMembers: state.showingUnavailable === "Hide" ? action.payload.players.filter(player => player.membershipStatus === "Member" && player.gameInfo.available === false) : initialState.unavailableMembers,
            nonMembers: initialState.nonMembers,
            playingTenBuckers: action.payload.players.filter(player => player.membershipStatus !== "Member" && player.gameInfo.available === true)
        }

        case EDIT_GAME_INFO:
        return {
            ...state,
            // Does the API only send available players?
            draft: action.payload,
            // playingTenBuckers: action.payload.players.filter(player => player.membershipStatus !== "Member"),
            // This handles the scenario where we want to show unavailable members in real time: 
            // for this, we now get the info directly from the API's response
            // then a ternary allows us to only show unavailable players if the option has been triggered
            // unavailableMembers: state.showingUnavailable === "Hide" ? action.payload.players.filter(player => player.membershipStatus === "Member" && player.gameInfo.available === false) : initialState.unavailableMembers
        }
        case MAKE_UNAVAILABLE:
        return {
            ...state,
            // We filter the id of the player which was removed. Since it creates an array, we extract the element by getting the index 0. Then, we add it to the existing array of unavailable members
            unavailableMembers: state.showingUnavailable === "Hide" ? [...state.unavailableMembers, state.draft.players.filter(player => player.membershipStatus === "Member" && player._id === action.player)[0]] : initialState.unavailableMembers,
            // We need to handle two scenarios: when a member was removed, and when a ten_bucker was removed
            // if the player is not a member, needs to be added to "nonMembers" array + needs to be removed from "playingTenBuckers" array
            nonMembers: state.showingTenBuckers === "Hide" ? [...state.nonMembers, state.draft.players.filter(player => player.membershipStatus !== "Member" && player._id === action.player)[0]] : initialState.nonMembers,
            playingTenBuckers: state.playingTenBuckers.filter(player => player._id !== action.player),
            draft: action.game
        }
        
        case MAKE_AVAILABLE:
        return {
            ...state,
            // removing properly from the array of unavailable players
            unavailableMembers: state.showingUnavailable === "Hide" ? (state.draft.players.filter(player => player.gameInfo.available === false && player.membershipStatus === "Member" && player._id !== action.player)) : initialState.unavailableMembers,
            // needs to be added to draft
            draft: action.game,
            nonMembers: state.showingTenBuckers === "Hide" ? (state.draft.players.filter(player => player.gameInfo.available === false && player.membershipStatus !== "Member" && player._id !== action.player)) : initialState.nonMembers,
            
            /*
            // We filter the id of the player which was added. Since it creates an array, we extract the element by getting the index 0. Then, we add it to the existing array of unavailable members
            unavailableMembers: state.showingUnavailable === "Hide" ? [...state.unavailableMembers, state.draft.players.filter(player => player.membershipStatus === "Member" && player._id === action.player)[0]] : initialState.unavailableMembers,
            // We need to handle two scenarios: when a member was removed, and when a ten_bucker was removed
            // if the player is not a member, needs to be added to "nonMembers" array + needs to be removed from "playingTenBuckers" array
            nonMembers: state.showingTenBuckers === "Hide" ? [...state.nonMembers, state.draft.players.filter(player => player.membershipStatus !== "Member" && player._id === action.player)[0]] : initialState.nonMembers,
            playingTenBuckers: state.playingTenBuckers.filter(player => player._id !== action.player),
            draft: action.game
            */
        }

        case DELETE_GAME:
        return {
            ...state,
            deletedGame: action.payload,
            visibility: initialState.visibility,
            games: state.games.filter(game => game._id !== action.payload._id),
            lockStatus: "hidden"
            }

        case SHOW_UNAVAILABLE_MEMBERS:
        return {
            ...state,
            // this no longer works: draft only shows available players. So, filtering unavailable doesn't return any result
            unavailableMembers: state.draft.players.filter(player => player.membershipStatus === "Member" && player.gameInfo.available === false),
            showingUnavailable: "Hide"
            // looks like showUnavailable is working initially. When call autodraft: the unavailable disappear (no longer showing, no longer in the state)
        }
        
        case HIDE_UNAVAILABLE_MEMBERS:
        return {
            ...state,
            unavailableMembers: initialState.unavailableMembers,
            showingUnavailable: "Show"
        }

        case SHOW_NON_MEMBERS:
        return {
            ...state,
            nonMembers: action.payload.filter(player => player._id !== state.playingTenBuckers._id),
            showingTenBuckers: "Hide"
        }
        case HIDE_NON_MEMBERS:
        return {
            ...state,
            nonMembers: initialState.nonMembers,
            showingTenBuckers: "Show"
        }

        // also, when a ten_bucker has been added, and then removed, it's showing in the list of unavailable players 
        // (which is unintented, but might not be a bad thing...?)

        case ADD_NON_MEMBER:
        return {
            ...state,
            draft: action.payload.players,
            nonMembers: state.nonMembers.filter(player => player._id !== action.payload.player._id),
            playingTenBuckers: [action.payload.player, ...state.playingTenBuckers]
        }

        case LOCK_GAME_INFO:
        return {
            ...state,
            lockStatus: action.payload === true ? "hidden" : "visible",
        }
        
        case UNLOCK_GAME_INFO:
        return {
            ...state,
            lockStatus: action.payload === true ? "hidden" : "visible",
        }

        default: 
        return state;
    }
}