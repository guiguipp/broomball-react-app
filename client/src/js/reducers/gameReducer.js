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
    notPlayingNonMembers: [],
    playingNonMembers: [],
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
            notPlayingNonMembers: initialState.notPlayingNonMembers,
            playingNonMembers: action.payload.players.filter(player => player.membershipStatus !== "Member" && player.gameInfo.available === true)
        }

        case EDIT_GAME_INFO:
        return {
            ...state,
            draft: action.payload,
        }

        case MAKE_UNAVAILABLE:
        return {
            ...state,
            // We need to handle two scenarios: when a member was removed, and when a ten_bucker was removed
            // if the player is not a member, needs to be added to "notPlayingNonMembers" array + needs to be removed from "playingNonMembers" array
            notPlayingNonMembers: action.payload.membershipStatus === "Ten Bucker" ? state.showingTenBuckers === "Hide" ? [...state.notPlayingNonMembers, state.draft.players.filter(player => player.membershipStatus !== "Member" && player._id === action.payload.player)[0]] : initialState.notPlayingNonMembers : state.notPlayingNonMembers,
            // We filter the id of the player who was removed. Since it creates an array, we extract the element by getting the index 0. Then, we add it to the existing array of unavailable members
            unavailableMembers: action.payload.membershipStatus === "Member" ? state.showingUnavailable === "Hide" ? _.sortBy([...state.unavailableMembers, state.draft.players.filter(player => player.membershipStatus === "Member" && player._id === action.payload.player)[0]],"name") : initialState.unavailableMembers : state.unavailableMembers,
            playingNonMembers: state.playingNonMembers.filter(player => player._id !== action.player),
            draft: action.payload.game
        }
        
        case MAKE_AVAILABLE:
        return {
            ...state,
            // removing properly from the array of unavailable players
            unavailableMembers: state.showingUnavailable === "Hide" ? (state.draft.players.filter(player => player.gameInfo.available === false && player.membershipStatus === "Member" && player._id !== action.player)) : initialState.unavailableMembers,
            // needs to be added to draft
            draft: action.game,
            notPlayingNonMembers: state.showingTenBuckers === "Hide" ? (state.draft.players.filter(player => player.gameInfo.available === false && player.membershipStatus !== "Member" && player._id !== action.player)) : initialState.notPlayingNonMembers,
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
            unavailableMembers: state.draft.players.filter(player => player.membershipStatus === "Member" && player.gameInfo.available === false),
            showingUnavailable: "Hide"
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
            notPlayingNonMembers: action.payload.filter(player => player._id !== state.playingNonMembers._id),
            showingTenBuckers: "Hide"
        }
        case HIDE_NON_MEMBERS:
        return {
            ...state,
            notPlayingNonMembers: initialState.notPlayingNonMembers,
            showingTenBuckers: "Show"
        }

        case ADD_NON_MEMBER:
        return {
            ...state,
            draft: action.payload.players,
            notPlayingNonMembers: state.notPlayingNonMembers.filter(player => player._id !== action.payload.player._id),
            playingNonMembers: [action.payload.player, ...state.playingNonMembers]
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