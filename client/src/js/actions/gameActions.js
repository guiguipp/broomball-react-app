import { FETCH_GAMES, NEW_GAME, DELETE_GAME } from './types';
import API from "../../utils/API"

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
}

export const addGame = (date) => dispatch => {
    API.createNewGame(date)
            .then(res => {
                if(res.status !== 200) {
                    throw new Error(res.statusText)
                    }
                else {
                    let newGame = res.data
                    if(newGame.name !== "MongoError")
                        {
                        console.log("Game successfully added to db")
                        dispatch({
                            type: NEW_GAME,
                            payload: res.data
                        })

                        }
                    else {
                        console.log("Error Message: the app encounted an error creating this game in the database")
                        }
                    }
            })
        }
