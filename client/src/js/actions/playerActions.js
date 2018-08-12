import { FETCH_PLAYERS, EDIT_PLAYER, DELETE_PLAYER, ADD_PLAYER, SHOW_TAB1, SHOW_TAB2, EDIT_FORM, UPDATE_FIELD } from './types';
import API from "../../utils/API"

export const fetchPlayers = () => dispatch => {
    API.getPlayers()
        .then(res => {
            if(res.status !== 200) {
                throw new Error(res.statusText)
            }
            else {
                dispatch({
                    type: FETCH_PLAYERS,
                    payload: res.data
                })
            }
        })
    }

export const deletePlayer = (id) => dispatch => {
    API.deletePlayer(id)
    .then(res => {
        if(res.status !== 200) {
            throw new Error(res.statusText)
        }
        else {
            dispatch({
                type: DELETE_PLAYER,
                payload: res.data
            })
        }
    })
}

export const addPlayer = (data) => dispatch => {
    API.addPlayer(data)
        .then(res => {
            if(res.status !== 200) {
                throw new Error(res.statusText)
                }
            else {
                let newPlayer = res.data
                if(newPlayer.name !== "MongoError")
                    {
                    console.log("Player successfully added to db")
                    dispatch({
                        type: ADD_PLAYER,
                        payload: res.data
                    })

                    }
                else {
                    console.log("Error Message: the app encounted an error creating this player in the database")
                    }
                }
            })
        }

export const editPlayer = (id, data) => dispatch => {
    API.editPlayer(id, data)
    .then(res => {
        if(res.status !== 200) {
            throw new Error(res.statusText)
        }
        else {
            dispatch({
                type: EDIT_PLAYER,
                payload: res.data
            })
        }
    })
}

export const toggleTab1 = (currentState) => dispatch => {
    if (currentState === "hide") {
        dispatch({
            type: SHOW_TAB1
            })
        }
    }

export const toggleTab2 = (currentState) => dispatch => {
    if (currentState === "hide") {
        dispatch({
            type: SHOW_TAB2
            })
        }
    }

export const editForm = (player) => dispatch => {
    dispatch({
        type: EDIT_FORM,
        payload: player
        })
    }
    
export const updateField = (player) => dispatch => {
    dispatch({
        type: UPDATE_FIELD,
        payload: player 
        })
    }
