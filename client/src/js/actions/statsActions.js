import { SHOW_GAMES_TO_STATS, GET_GAMES_AND_TRANSFORM } from './types';
import API from "../../utils/API"

export const toggleVisibility = (currentState) => dispatch => {
    if (currentState === "hidden") {
        dispatch({
            type: SHOW_GAMES_TO_STATS
            })
        }
    }

export const getGamesAndTransform = () => dispatch => {
    
    const monthify = (string) => {
        switch (string) {
            case "01":
            return string = "January"
            
            case "02":
            return string = "February"
            
            case "03":
            return string = "March"
            
            case "04":
            return string = "April"
            
            case "05":
            return string = "May"
            
            case "06":
            return string = "June"
            
            case "07":
            return string = "July"
            
            case "08":
            return string = "August"
            
            case "09":
            return string = "September"
            
            case "10":
            return string = "October"
            
            case "11":
            return string = "November"
            
            case "12":
            return string = "December"
            
            default: 
            return

        }
        }

    const yearString = (game) => game.substring(0, 4)
    const monthString = (game) => game.substring(5,7)

    const beautifyGames = (array) => {
        let object =
        array.reduce((difYears,game) => {
            difYears[yearString(game._id)] = difYears[yearString(game._id)] || [];
            difYears[yearString(game._id)].push(game);
            return difYears;
            },{} 
        )
        let arrayOfObjects = []
        for (let i = 0; i < Object.values(object).length; i++) {
            // for each array of games of the object created by the first reduce
            let remapped = Object.values(object)[i].reduce((difMonths, game) => {
                // each game is pushed to a different array under the "month"
                difMonths[monthify(monthString(game._id))] = difMonths[monthify(monthString(game._id))] || [];
                difMonths[monthify(monthString(game._id))].push(game);
                return difMonths;
                },{}
            )
            // This separates the months into distinct arrays. We push them in a separate array, 
            // otherwise another year's games might overwrite the data
            arrayOfObjects.push({[Object.keys(object)[i]]: remapped})
            }
            return arrayOfObjects
        }

    API.getGames()
        .then(res => {
            if(res.status !== 200) {
                throw new Error(res.statusText)
            }
            else {
                let reducedGames = beautifyGames(res.data)
                dispatch({
                    type: GET_GAMES_AND_TRANSFORM,
                    payload: reducedGames
                })
            }
        })
    }
    