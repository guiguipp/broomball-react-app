import { CREATE_GAME_ROSTER } from "./types"
import API from "../../utils/API"

export const addPlayersToRoster = (date, players) => dispatch => {
    API.createRoster(date, players)
        .then(res => {
            if(res.status !== 200) {
                throw new Error(res.statusText)
                }
            else {
                let newRoster = res.data
                if(newRoster.name !== "MongoError")
                    {
                    console.log("Added to roster")
                    dispatch({
                        type: CREATE_GAME_ROSTER,
                        payload: res.data
                    })

                    }
                else {
                    console.log("Error Message: the app encountered an error adding player(s) to the draft")
                    }
                }
            })
        }
