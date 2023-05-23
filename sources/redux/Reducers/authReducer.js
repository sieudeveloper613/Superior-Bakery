import { LOGIN_ACTION, LOGOUT_ACTION, EMAIL_CHECKING } from "../Types";

const initState = {
    authInfo: null,
    emailChecking: false,
}

const authReducer = ( state = initState, { type, payload }) => {
    switch(type) {
        case LOGIN_ACTION: 
            return {
                ...state,
                authInfo: payload
            }
        case LOGOUT_ACTION: 
            return {
                emailChecking: false,
                authInfo: null
            }
        case EMAIL_CHECKING: 
            return {
                ...state,
                emailChecking: true
            }
        default:
            return state;
    }
}

export default authReducer;