import axios from "axios";
// Transforming the current url in order to query the public API locally 
// (Express port 3001 changed to React port 3000 where the API exists).
// Once deployed, it should reset to the domain name used.
let currentURL = window.location.origin
if (currentURL === "http://localhost:3000") {
    currentURL = "http://localhost:8080"
    } 
// For Passport.js: 
/* Server sends SetCookie header then the browser handle to store it, and then the cookie is sent with requests made to 
the same server inside a Cookie HTTP header.
https://stackoverflow.com/questions/45536831/node-express-passport-req-user-undefined-but-works-in-postman

const config = {
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    }
}
*/

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
    },
    addNewUser: (userData) => {
        const url = currentURL + "/users"
        return axios.post(url, {userData})
    },
    authenticateUser: (mode, userData) => {
        const url = currentURL + "/auth/login"
        if (mode === "local") {
            return axios.post(url, userData)
        }
    },
    checkUser: () => {
        const url = currentURL + "/auth/login"
        return axios.get(url)
    },
    }
