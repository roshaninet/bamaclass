import {parseCookies, setCookie} from 'nookies'


export const setCookieItem = (key, value, context = {}) => {
    setCookie(context, key, value, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/'
    })

};

export const removeCookie = (key, context = {}) => {
    setCookie(context, key, '', {
        maxAge: -1,
        path: '/',
    })
};

export const getCookie = (key, context = {}) => {
    let cookies = parseCookies(context);
    return cookies.hasOwnProperty(key) ? cookies[key] : null;
};


export const getCookies = (context = {}) => {
    return parseCookies(context);
};

