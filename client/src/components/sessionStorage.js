import API from "../utils/API"

/* https://egghead.io/lessons/javascript-redux-persisting-the-state-to-the-local-storage */

export const loadState = () => {
    try {
        const serializedState = sessionStorage.getItem('state');
        if (serializedState === null ) {
            return undefined;
        }
        return JSON.parse(serializedState)
    } catch (err) {
        return undefined
    }
};

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        sessionStorage.setItem("state", serializedState);
    } catch (err) {
        console.log(err)
    }
}
// https://stackoverflow.com/questions/36486397/passport-login-and-persisting-session
export const checkAuthentication = () => {
    API.checkUser();
}