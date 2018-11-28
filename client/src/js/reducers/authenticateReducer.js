import { 
    UPDATE_USER_FORM,
    ADD_NEW_USER,
    SIGN_MODE,
} from "../actions/types"

const initialState = {
    user: 
        {
        username: "",
        password: "",
        email: ""
        },
    tabs: ["show_tab","hide_tab"], // this is used in the sign-in/sign-up user form
    // superAdminPrivileges: false,
    // adminPrivileges: false,
    // draftPrivileges: false,
    }

export default function(state = initialState, action) {
    switch(action.type) {
        case UPDATE_USER_FORM:
        return {
            ...state,
            user: action.payload,
        }

        case ADD_NEW_USER:
        return {
            ...state,
            user: initialState.user
        }

        case SIGN_MODE:
        return {
            ...state,
            tabs: state.tabs.map((tab, index) => {if(index !== action.payload) {return tab = "hide_tab"} else {return tab = "show_tab"}})
        }
        
        default: 
        return state;
    }
}

