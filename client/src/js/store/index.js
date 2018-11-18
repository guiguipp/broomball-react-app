import { createStore, applyMiddleware, compose } from 'redux';
import thunk from "redux-thunk";
import rootReducer from "../reducers";

const initialState = {}
const middleware = [thunk]

// createStore is the function for creating the Redux store

// since it crashes on Safari, and Chrome in incognito mode, we only install Redux DevTools on Chrome in Dev Mode
if (window.navigator.userAgent.includes('Chrome') && window.location.origin === "http://localhost:3000") {
    var store = createStore(
        rootReducer, 
        initialState, 
        compose(
            applyMiddleware(...middleware),
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
            )
        );
} else {
    store = createStore(
        rootReducer, 
        initialState,
        compose(
            applyMiddleware(...middleware)
            )
        )
}


export default store;