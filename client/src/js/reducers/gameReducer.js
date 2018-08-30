import { 
    FETCH_GAMES, 
    NEW_GAME, 
    DELETE_GAME, 
    GET_GAME, 
    EDIT_GAME_INFO, 
    RESET,
    SHOW_UNAVAILABLE_MEMBERS, 
    HIDE_UNAVAILABLE_MEMBERS, 
    MAKE_MEMBER_UNAVAILABLE,
    MAKE_TEN_BUCKER_UNAVAILABLE,
    MAKE_MEMBER_AVAILABLE,
    SHOW_NON_MEMBERS,
    HIDE_NON_MEMBERS, 
    ADD_NON_MEMBER, 
    LOCK_GAME_INFO,
    UNLOCK_GAME_INFO,
    TRIGGER_PICK_MODE,
    TRIGGER_DRAFT_MODE,
    SET_PICK_DARK,
    SET_PICKS_DARK
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
        darkPickNum: 0,
        whitePickNum: 0,
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
    showingNonPlayingTenBuckers: "Show",    // which means this section is hidden
    showingUnavailableMembers: "Show",      // which means this section is hidden
    draftMode: "Dark",
    pickButtons: {
        right: "Set Dark Picks",
        left: "Set White Picks"
    }
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
            playingNonMembers: initialState.playingNonMembers,
            // darkPicked: _.sortBy(action.payload.players.filter(player => player.gameInfo.darkPickNum !== 0),(obj) => obj.gameInfo.darkPickNum),
            // darkUnpicked: action.payload.players.filter(player => player.gameInfo.darkPickNum === 0),
            // whitePicked: _.sortBy(action.payload.players.filter(player => player.gameInfo.whitePickNum !== 0),(obj) => obj.gameInfo.whitePickNum),
            // whiteUnpicked: action.payload.players.filter(player => player.gameInfo.whitePickNum === 0),
        }

        case EDIT_GAME_INFO:
        return {
            ...state,
            draft: action.payload,
            notPlayingNonMembers: initialState.notPlayingNonMembers,
            playingNonMembers: initialState.playingNonMembers,
            showingNonPlayingTenBuckers: "Show",
            showingUnavailableMembers: "Show",
        }
        
        case RESET:
        return {
            ...state,
            draft: action.payload,
            unavailableMembers: initialState.unavailableMembers,
            notPlayingNonMembers: initialState.notPlayingNonMembers,
            playingNonMembers: initialState.playingNonMembers,
        }

        case MAKE_MEMBER_UNAVAILABLE:
        return {
            ...state,
            unavailableMembers: state.showingUnavailableMembers === "Hide" ? action.payload.players.filter(player => player.membershipStatus === "Member" && player.gameInfo.available === false) : initialState.unavailableMembers,
            draft: action.payload
        }

        case MAKE_TEN_BUCKER_UNAVAILABLE:
        return {
            /* The Ten Buckers are managed outside of the "game" object. If they would just be set as "Unavailable" like Members, duplicates may be created.
            They need to be removed from the game object altogether. Therefore, their status is handled in the reducer once sent to the state.
            The allTenBuckers array that populates after a click is making this easier: when a Ten Bucker is set as unavailable, it is filtered 
            out of the array of playingNonMembers. It is also added to the array of notPlayingNonMembers: their data is checked agains the array of allTenBuckers
            via a filter. It creates an array of 1 element, that we add to the notPlayingNonMembers array by extracting its index 0 */
            ...state,
            draft: action.payload.gameData,
            notPlayingNonMembers: state.showingNonPlayingTenBuckers === "Hide" ? _.sortBy([...state.notPlayingNonMembers, state.allTenBuckers.filter(player => player._id === action.payload.player)[0]],"name") : initialState.notPlayingNonMembers,
            playingNonMembers: state.playingNonMembers.filter(player => player._id !== action.payload.player),
        }
        // this case only deals with Members as Ten Buckers are handled separately through ADD_NON_MEMBER
        case MAKE_MEMBER_AVAILABLE:
        return {
            ...state,
            // removing properly from the array of unavailable players
            unavailableMembers: state.showingUnavailableMembers === "Hide" ? (state.draft.players.filter(player => player.gameInfo.available === false && player.membershipStatus === "Member" && player._id !== action.payload.player)) : initialState.unavailableMembers,
            draft: action.payload.game,
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

        case TRIGGER_PICK_MODE:
        return {
            ...state,
            draftMode: action.payload.team,
            pickButtons: action.payload.buttons,
        }

        case TRIGGER_DRAFT_MODE:
        return {
            ...state,
            draftMode: "Draft",
            pickButtons: initialState.pickButtons
        }

        case SET_PICK_DARK:
        return {
            ...state,
            // draft: {...state.draft, players: _.sortBy(action.payload.players, (obj) => obj.gameInfo.darkPickNum)},
            draft: action.payload
            // darkUnpicked: action.payload.players.filter(player => player.gameInfo.darkPickNum === 0),
        }
        /*
        case SET_PICKS_DARK:
        return {
            ...state,
            // draft: {...state.draft, players: _.sortBy(action.payload.players, (obj) => obj.gameInfo.darkPickNum)},
            darkPicked: action.payload.players.filter(player => player.gameInfo.darkPickNum !== 0),
            darkUnpicked: action.payload.players.filter(player => player.gameInfo.darkPickNum === 0),
        }*/

        default: 
        return state;
    }
}