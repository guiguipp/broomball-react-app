import axios from "axios";
let currentURL = window.location.origin;

export default {
    getFutureGames: (gameDate) => {
        // Transforming the current url in order to query the public API locally 
        // (Express port 3001 changed to React port 3000 where the API exists).
        // Once deployed, it should reset to the domain name used.
        console.log("Before Ternary: ", currentURL)
        currentURL = "http://localhost:3000" ? "http://localhost:8080" : window.location.origin
        console.log("After Ternary: ", currentURL)
        // Querying our API
        return axios.get(currentURL + "/api/game/" + gameDate + "/upcoming")
    }
}
