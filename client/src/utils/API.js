import axios from "axios";
const currentURL = "http://localhost:3000" ? "http://localhost:8080" : window.location.origin

export default {
    getGames: () => {
        // Transforming the current url in order to query the public API locally 
        // (Express port 3001 changed to React port 3000 where the API exists).
        // Once deployed, it should reset to the domain name used.
        
        // Querying our API
        return axios.get(currentURL + "/api/game/")
        },
    createNewGame: (date) => {
        const url = currentURL + "/api/game/"
        return axios.post(url, {
            game_date: date
            })
        },
    deleteGame: (id) => {
        return axios.delete(currentURL + "/api/game/" + id)
        },
    addPlayer: (data) => {
        const url = currentURL + "/api/player/"
        return axios.post(url, {data})
        }   
    }
