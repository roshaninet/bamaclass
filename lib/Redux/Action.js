import {removeCookie, setCookieItem} from "../Cookie";

export const signIn = (user , token = null) => {
    // removeCookie('user');
    setCookieItem('user', decodeURIComponent(JSON.stringify(user)));
    if(token) {
        setCookieItem('token', token);
    }
    return {
        type: "SIGN_IN",
        value: user,
    }
}

export const signOut = () => {
    removeCookie('user');
    removeCookie('token');
    return {
        type: "SIGN_OUT",
        value: null,
    }
}

export const setAuthShow = (authShow, after = null) => {
    return {
        type: "AUTH_SHOW",
        value: authShow,
        after: after
    }
}


export const setMobileMode = (isMobile) => {
    return {
        type: "IS_MOBILE",
        value: isMobile
    }
}

export const setLoader = (inLoad) => {
    return {
        type: "IN_LOAD",
        value: inLoad
    }
}

export const setNotifications = (notifications) => {
    return {
        type: "SET_NOTIFICATIONS",
        value: notifications
    }
}

export const setPager = (perPage) => {
    setCookieItem('pager', perPage);
    return {
        type: "PAGER",
        value: perPage
    }
}
