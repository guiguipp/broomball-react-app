import { SHOW_FUTURE, SHOW_PAST } from '../actions/types';
const moment = require("moment");

const initialState = {
    showing: "future",
    upcoming_visibility: "visible",
    past_visibility: "hidden",
    dateHeader: "Upcoming",
    buttonMsg: "Past",
    today: moment().format("YYYY-MM-DD")    
    }

export default function(state = initialState, action) {
    switch(action.type) {
        case SHOW_FUTURE:
        return {
            ...state,
            upcoming_visibility: "visible",
            past_visibility: "hidden",
            dateHeader: "Upcoming",
            buttonMsg: "Past",
            showing: "future",
        }
        
        case SHOW_PAST:
        return {
            ...state,
            upcoming_visibility: "hidden",
            past_visibility: "visible",
            dateHeader: "Past",
            buttonMsg: "Upcoming",
            showing: "past"
        }
        
        default:
        return state;
    }
}