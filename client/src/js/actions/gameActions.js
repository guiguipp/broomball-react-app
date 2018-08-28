import { 
    FETCH_GAMES, 
    NEW_GAME, 
    GET_GAME, 
    DELETE_GAME, 
    EDIT_GAME_INFO, 
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
    SET_PICK_DARK
} from './types';

import API from "../../utils/API"
import _ from "underscore"

export const fetchGames = () => dispatch => {
    API.getGames()
        .then(res => {
            if(res.status !== 200) {
                throw new Error(res.statusText)
            }
            else {
                dispatch({
                    type: FETCH_GAMES,
                    payload: res.data
                })
            }
        })
    }

export const deleteGame = (id) => dispatch => {
    API.deleteGame(id)
    .then(res => {
        if(res.status !== 200) {
            throw new Error(res.statusText)
        }
        else {
            dispatch({
                type: DELETE_GAME,
                payload: res.data
            })
        }
    })
    // once the game is deleted, we also delete the associated Roster
    // API.deleteRoster(id)
}

export const addGame = (date, players, player, members) => dispatch => {
    API.addGame(date, players, player, members)
            .then(res => {
                if(res.status !== 200) {
                    throw new Error(res.statusText)
                    }
                else {
                    let newGame = res.data
                    // console.log("res.data: ", res.data)
                    if(newGame.name){
                        console.log("Error Message: the app encountered an error creating this game in the database")
                    }
                    else {
                        console.log("Game successfully added to db")
                        dispatch({
                            type: NEW_GAME,
                            payload: res.data
                        })
                        }
                    }
            })
        }

export const getGame = (game) => dispatch => {
    API.getGame(game)
        .then(res => {
            if(res.status !== 200) {
                throw new Error(res.statusText)
            }
            else {
                dispatch({
                    type: GET_GAME,
                    payload: res.data
                })
            }
        })
}

export const editGameInfo = (game, data) => dispatch => {
    API.editGame(game, data)
    .then(res => {
        if(res.status !== 200) {
            throw new Error(res.statusText)
        }
        else {
            // we get full game data from the API's response
            // console.log("res.data: ", res.data)
            dispatch({
                type: EDIT_GAME_INFO,
                payload: res.data
            })
        }
    })
}

export const setMemberUnavailable = (game, data) => dispatch => {
        API.editGame(game, data)
        .then(res => {
            if(res.status !== 200) {
                throw new Error(res.statusText)
            }
            else {
                // we get the game info
                // console.log("res.data: ", res.data)
                dispatch({
                    type: MAKE_MEMBER_UNAVAILABLE,
                    payload: res.data
                    })
                }
            })
    }
export const setTenBuckerUnavailable = (gameId, gameData, playerID) => dispatch => {
    API.editGame(gameId, gameData)
        .then(res => {
            if(res.status !== 200) {
                throw new Error(res.statusText)
            }
            else {
                // we get the game info
                // console.log("res.data: ", res.data)
                dispatch({
                    type: MAKE_TEN_BUCKER_UNAVAILABLE,
                    payload: {
                        gameData: res.data,
                        player: playerID
                        }
                    })
                }
            })
        }
export const setAvailable = (game, data) => dispatch => {
    // console.log("data.player: ", data.player, "\n(is the id of player to add)")
    API.editGame(game, data)
    .then(res => {
        if(res.status !== 200) {
            throw new Error(res.statusText)
        }
        else {
            // we get the game info
            // console.log("res.data: ", res.data)
            dispatch({
                type: MAKE_MEMBER_AVAILABLE,
                payload: {
                    player: data.player,
                    game: res.data
                    }
            })
        }
    })
}


export const showUnavailable = () => dispatch => {
    dispatch({
        type: SHOW_UNAVAILABLE_MEMBERS
    })
}

export const hideUnavailable = () => dispatch => {
    dispatch({
        type: HIDE_UNAVAILABLE_MEMBERS
    })
}

export const showNonMembers = (allTenBuckers, notPlayingTenBuckers) => dispatch => {
    dispatch({
        type: SHOW_NON_MEMBERS,
        payload: {
            all: allTenBuckers,
            new: notPlayingTenBuckers
                }
    })
}

export const hideNonMembers = () => dispatch => {
    dispatch({
        type: HIDE_NON_MEMBERS
    })
}
// Adds a Ten Bucker to the list of players
export const addNonMember = (game, newPlayer, existingPlayers) => dispatch => {
    let newRoster = _.sortBy([...existingPlayers, newPlayer], "name")
    API.editGame(game, {players: newRoster})
    .then(res => {
        if(res.status !== 200) {
            throw new Error(res.statusText)
        }
        else {
            dispatch({
                type: ADD_NON_MEMBER,
                payload: {players: res.data, player: newPlayer}
            })
        }
    })
}

export const lockGameInfo = (game) => dispatch => {
    let lock = {lock_status: true}
    API.editGame(game, lock)
    .then(res => {
        if(res.status !== 200) {
            throw new Error (res.statusText)
        }
        else {
            dispatch({
                type: LOCK_GAME_INFO,
                payload: res.data.lock_status,
            })
        }
    })
}

export const unlockGameInfo = (game) => dispatch => {
    let lock = {lock_status: false}
    API.editGame(game, lock)
    .then(res => {
        if(res.status !== 200) {
            throw new Error (res.statusText)
        }
        else {
            dispatch({
                type: UNLOCK_GAME_INFO,
                payload: res.data.lock_status,
            })
        }
    })
}

export const triggerPickMode = (team) => dispatch => {
    switch (team) {
        case "Dark":
        dispatch({
                type: TRIGGER_PICK_MODE,
                payload: 
                    { 
                        team: team,
                        buttons: 
                        {
                        right: "Exit",
                        left: "Set White Picks"
                        }
                    }
                })
                break;
        case "White":
        dispatch({
                type: TRIGGER_PICK_MODE,
                payload: {
                    right: "Set Dark Picks",
                    left: "Exit"
                    }
                })
                break;
        default:
            console.log("There was an error in the dispatcher")
    }
    }

export const triggerDraftMode = () => dispatch => {
    dispatch({
        type: TRIGGER_DRAFT_MODE
        })
}

export const setPick = (team, game, data) => dispatch => {
    API.editGame(game, data)
    .then(res => {
        if(res.status !== 200) {
            throw new Error(res.statusText)
        }
        else {
            // console.log("res.data in the setPick function: ", res.data)
            switch (team) {
                case "Dark":
                dispatch({
                    type: SET_PICK_DARK,
                    payload: res.data
                    })
                break;

                default: 
                return;
                }
            }
        
    })
} 