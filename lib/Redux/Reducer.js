import {HYDRATE} from "next-redux-wrapper";

let initialState = {
    user: null,
    isLogin: false,
    isMobile: false,
    loader: false,
    authShow: false,
    notifications: [],
    toast: null,
    pager: 12
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case HYDRATE:
            return {...state, ...action.payload}
        case "SIGN_IN":
        case "SIGN_OUT":
            return {
                ...state,
                user: action.value,
                isLogin: !!action.value,
            };
        case "IS_MOBILE":
            return {
                ...state,
                isMobile: action.value,
            };
        case "PAGER":
            return {
                ...state,
                pager: action.value,
            };
        case "IN_LOAD":
            return {
                ...state,
                loader: action.value,
            };
        case "AUTH_SHOW":
            return {
                ...state,
                authShow: action.value,
                after: action.after,
            };

        case "SET_NOTIFICATIONS":
            return {
                ...state,
                notifications: action.value
            };
        default:
            return state;
    }
}

export default appReducer;
