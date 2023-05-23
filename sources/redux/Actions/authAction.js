import { EMAIL_CHECKING, LOGIN_ACTION, LOGOUT_ACTION } from "../Types";

const loginAction = (payload) => {
    return {
        type: LOGIN_ACTION,
        payload
    }
}

const logoutAction = () => {
    return {
        type: LOGOUT_ACTION
    }
}

const emailCheckingAction = () => {
    return {
        type: EMAIL_CHECKING
    }
}

export {
    loginAction, logoutAction, emailCheckingAction
}