import axios from "axios";
// Transforming the current url in order to query the public API locally 
// (Express port 3001 changed to React port 3000 where the API exists).
// Once deployed, it should reset to the domain name used.
const currentURL = "http://localhost:3000" ? "http://localhost:8080" : window.location.origin

export default {
    getGames: () => {       
        const url = currentURL + "/api/game/"
        return axios.get(url)
        },
    createNewGame: (date) => {
        const url = currentURL + "/api/game/"
        return axios.post(url, { game_date: date })
        },
    deleteGame: (id) => {
        const url = currentURL + "/api/game/" + id
        return axios.delete(url)
        },
    addPlayer: (player) => {
        const url = currentURL + "/api/player/"
        return axios.post(url, { player })
        },
    getPlayers: () => {
        const url = currentURL + "/api/player/"
        return axios.get(url)
        }
    }
