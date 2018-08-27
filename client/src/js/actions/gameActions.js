import { 
    FETCH_GAMES, 
    NEW_GAME, 
    GET_GAME, 
    DELETE_GAME, 
    EDIT_GAME_INFO, 
    SHOW_UNAVAILABLE_MEMBERS, 
    HIDE_UNAVAILABLE_MEMBERS, 
    MAKE_UNAVAILABLE, 
    MAKE_AVAILABLE,
    SHOW_NON_MEMBERS, 
    HIDE_NON_MEMBERS,
    ADD_NON_MEMBER, 
    LOCK_GAME_INFO, 
    UNLOCK_GAME_INFO,
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
//
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
            console.log("res.data: ", res.data)
            dispatch({
                type: EDIT_GAME_INFO,
                payload: res.data
            })
        }
    })
}

export const setUnavailable = (game, data) => dispatch => {
    console.log("data.player: ", data.player, "\n(should be id of player to remove)")
    let idOfRemoved = data.player;
    API.editGame(game, data)
    .then(res => {
        if(res.status !== 200) {
            throw new Error(res.statusText)
        }
        else {
            // we get the game info
            console.log("res.data: ", res.data)
            dispatch({
                type: MAKE_UNAVAILABLE,
                player: idOfRemoved,
                game: res.data,
            })
        }
    })
}
export const setAvailable = (game, data) => dispatch => {
    console.log("data.player: ", data.player, "\n(should be id of player to add)")
    let idOfAdded = data.player;
    API.editGame(game, data)
    .then(res => {
        if(res.status !== 200) {
            throw new Error(res.statusText)
        }
        else {
            // we get the game info
            console.log("res.data: ", res.data)
            dispatch({
                type: MAKE_AVAILABLE,
                player: idOfAdded,
                game: res.data,
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

export const showNonMembers = (players) => dispatch => {
    dispatch({
        type: SHOW_NON_MEMBERS,
        payload: players
    })
}

export const hideNonMembers = () => dispatch => {
    dispatch({
        type: HIDE_NON_MEMBERS
    })
}

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
