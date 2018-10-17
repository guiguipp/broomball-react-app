import {
    UPDATE_USER_FORM,
    ADD_NEW_USER,
    SIGN_MODE
} from "./types"

import { saveState } from "../../components/sessionStorage"

import API from "../../utils/API"

export const updateUserForm = (data) => dispatch => {
    dispatch({
        type: UPDATE_USER_FORM,
        payload: data
    })
}

export const createNewUser = ( newUser ) => dispatch => {
    API.addNewUser( newUser).then(res => {
        if(res.status !== 200) {
            throw new Error(res.statusText)
        }
        else {
            dispatch({
                type: ADD_NEW_USER,
                payload: res.data
            })
        }
    })
}

export const toggleTabStatus = (id) => dispatch => {
    dispatch({
        type: SIGN_MODE,
        payload: id
    })
}

export const authenticateUser = (method, user) => dispatch => {
    console.log("data in authenticateUser authenticateActions.js: ", user)
    if (method === "local") {
        API.authenticateUser("local", user).then(res => {
            if (!res.data.errmsg) {
                console.log("Response from authentication API: ", res.data)
                // dispatch({
                //     type: SETTING_USER_PRIVILEGES,
                //     payload: res.data
                // })
                switch (res.data.privilege) {
                    case "SuperAdmin":
                    saveState({
                        SuperAdmin: true,
                        draftTeams: true,
                        changeAvailability: true,
                        createGame: true,
                        deleteGame: true,
                        editScore: true,
                        changeLock: true,
                        createPlayer: true,
                        editMember: true,
                        deleteMember: true,
                        editTenBucker: true,
                        deleteTenBucker: true
                    })

                    break;

                    default:
                    return;
                }
            }
        })
    }
}
