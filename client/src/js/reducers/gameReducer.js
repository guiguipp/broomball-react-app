import { 
    FETCH_GAMES, 
    NEW_GAME, 
    DELETE_GAME, 
    GET_GAME, 
    EDIT_GAME_INFO, 
    SHOW_UNAVAILABLE_MEMBERS, 
    HIDE_UNAVAILABLE_MEMBERS, 
    MAKE_MEMBER_UNAVAILABLE,
    MAKE_TEN_BUCKER_UNAVAILABLE,
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
    allTenBuckers: [],
    notPlayingNonMembers: [],
    playingNonMembers: [],
    lockStatus: "visible",
    showingNonPlayingTenBuckers: "Show",
    showingUnavailableMembers: "Show"
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
            unavailableMembers: state.showingUnavailableMembers === "Hide" ? action.payload.players.filter(player => player.membershipStatus === "Member" && player.gameInfo.available === false) : initialState.unavailableMembers,
            notPlayingNonMembers: initialState.notPlayingNonMembers,
            playingNonMembers: action.payload.players.filter(player => player.membershipStatus !== "Member" && player.gameInfo.available === true)
        }

        case EDIT_GAME_INFO:
        return {
            ...state,
            draft: action.payload,
        }

        case MAKE_MEMBER_UNAVAILABLE:
        return {
            ...state,
            unavailableMembers: state.showingUnavailableMembers === "Hide" ? action.payload.players.filter(player => player.membershipStatus === "Member" && player.gameInfo.available === false) : initialState.unavailableMembers,
            draft: action.payload
        }

        case MAKE_TEN_BUCKER_UNAVAILABLE:
        return {
            ...state,
            draft: action.payload.gameData,
            // allTenBuckers: [],
            notPlayingNonMembers: state.showingNonPlayingTenBuckers === "Hide" ? [...state.notPlayingNonMembers, state.allTenBuckers.filter(player => player._id === action.payload.player)[0]] : initialState.notPlayingNonMembers,
            playingNonMembers: state.playingNonMembers.filter(player => player._id !== action.payload.player),
        }
        
        case MAKE_AVAILABLE:
        return {
            ...state,
            // removing properly from the array of unavailable players
            unavailableMembers: state.showingUnavailableMembers === "Hide" ? (state.draft.players.filter(player => player.gameInfo.available === false && player.membershipStatus === "Member" && player._id !== action.player)) : initialState.unavailableMembers,
            // needs to be added to draft
            draft: action.game,
            notPlayingNonMembers: state.showingNonPlayingTenBuckers === "Hide" ? (state.draft.players.filter(player => player.gameInfo.available === false && player.membershipStatus !== "Member" && player._id !== action.player)) : initialState.notPlayingNonMembers,
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
            showingUnavailableMembers: "Hide"
        }
        
        case HIDE_UNAVAILABLE_MEMBERS:
        return {
            ...state,
            unavailableMembers: initialState.unavailableMembers,
            showingUnavailableMembers: "Show"
        }

        case SHOW_NON_MEMBERS:
        return {
            ...state,
            allTenBuckers: action.payload.all,
            notPlayingNonMembers: action.payload.new,
            showingNonPlayingTenBuckers: "Hide"
        }
        case HIDE_NON_MEMBERS:
        return {
            ...state,
            notPlayingNonMembers: initialState.notPlayingNonMembers,
            showingNonPlayingTenBuckers: "Show"
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