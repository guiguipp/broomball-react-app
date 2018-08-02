import { SHOW_FUTURE, SHOW_PAST } from '../actions/types';
const moment = require("moment");

const initialState = {
    showing: "future",
    upcoming_visibility: "visible",
    past_visibility: "hidden",
    dateHeader: "Upcoming Games",
    buttonMsg: "Past Games",
    today: moment().format("YYYY-MM-DD")    
    }

export default function(state = initialState, action) {
    switch(action.type) {
        case SHOW_FUTURE:
        return {
            ...state,
            upcoming_visibility: "visible",
            past_visibility: "hidden",
            dateHeader: "Upcoming Games",
            buttonMsg: "Past Games",
            showing: "future"
        }
        
        case SHOW_PAST:
        return {
            ...state,
            upcoming_visibility: "hidden",
            past_visibility: "visible",
            dateHeader: "Past Games",
            buttonMsg: "Upcoming Games",
            showing: "past"
        }

        default: 
        return state;
    }
}