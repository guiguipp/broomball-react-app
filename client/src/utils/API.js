import axios from "axios";
// Transforming the current url in order to query the public API locally 
// (Express port 3001 changed to React port 3000 where the API exists).
// Once deployed, it should reset to the domain name used.
const currentURL = window.location.origin

export default {
    getGames: () => {       
        const url = currentURL + "/api/game/"
        return axios.get(url)
        },
    getGame: (id) => {
        const url = currentURL + "/api/game/" + id
        return axios.get(url)
    },
    addGame: (date, players) => {
        const url = currentURL + "/api/game/"
        return axios.post(url, { game_date: date, players: players})
        },
    deleteGame: (id) => {
        const url = currentURL + "/api/game/" + id
        return axios.delete(url)
        },
    editGame: (gameId, data) => {
        const url = currentURL + "/api/game/" + gameId
        return axios.put(url, { data })
        },

    getPlayers: () => {
        const url = currentURL + "/api/player/"
        return axios.get(url)
        },
    addPlayer: (player) => {
        const url = currentURL + "/api/player/"
        return axios.post(url, { player })
        },
    editPlayer: (id, data) => {
        const url = currentURL + "/api/player/" + id
        return axios.put(url, { data })
        },
    deletePlayer: (id) => {
        const url = currentURL + "/api/player/" + id
        return axios.delete(url)
    }
    }
