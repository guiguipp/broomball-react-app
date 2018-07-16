import axios from "axios";
let currentURL = window.location.origin;

export default {
    getDate: function() {
        // Transforming the current url in order to query the public API locally 
        // (Express port 3001 changed to React port 3000 where the API exists).
        // Once deployed, it should reset to the domain name used.
        currentURL = "localhost:3001/" ? "http://localhost:3000" : window.location.origin
        // Querying our public API
        return axios.post(currentURL + "/api/games/")
    }
}
