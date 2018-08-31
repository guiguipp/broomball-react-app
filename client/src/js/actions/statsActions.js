import { SHOW_GAMES_TO_STATS } from './types';

export const toggleVisibility = (currentState) => dispatch => {
    if (currentState === "hidden") {
        dispatch({
            type: SHOW_GAMES_TO_STATS
            })
        }
    }