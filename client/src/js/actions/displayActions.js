import { SHOW_FUTURE, SHOW_PAST } from './types';

export const toggleGames = (currentState) => dispatch => {
    if (currentState === "past") {
        dispatch({
            type: SHOW_FUTURE
        })
    }
    else {
        dispatch({
            type: SHOW_PAST
        })
    }
    }