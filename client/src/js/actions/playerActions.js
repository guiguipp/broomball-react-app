import { FETCH_PLAYERS, DELETE_PLAYER, ADD_PLAYER, FORM_UPDATE_VALUE, FORM_RESET } from './types';
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
                    console.log("Error Message: the app encounted an error creating this game in the database")
                    }
                }
            })
        }

export const editPlayer = (id, data) => dispatch => {
    API.deletePlayer(id, data)
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

export const formUpdate = (data) => {    
        return {
        type: FORM_UPDATE_VALUE,
        payload: data
    }

}

export const formReset = () => dispatch => {
    dispatch({
        type: FORM_RESET
    })
}
/*
export function update(name, value) {
    return function(dispatch) {
        dispatch({
            type: FORM_UPDATE_VALUE,
            payload: {player: value}
        })
    }
}*/