import { FETCH_GAMES, NEW_GAME } from './types';
import API from "../../utils/API"

export const fetchGames = () => dispatch => {
    console.log("Fetching the games")
    API.getGames()
        .then(res => {
            if(res.status !== 200) {
                throw new Error(res.statusText)
            }
            else {
                console.log("Getting Games from API in postActions.js: ", res.data)
                // res.data => dispatch
                dispatch({
                    type: FETCH_GAMES,
                    payload: res.data
                })
            }
        })
    }


/*
export const fetchPosts = () => dispatch => {
    fetch("localhost:8080/api/game/")
    .then(res => res.json())
    .then(games => dispatch({
        type: FETCH_POSTS,
        payload: games
    }))
}
*/