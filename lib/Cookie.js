import Cookies from 'js-cookie';

export class CookieManager {

    /**
     * @desc dsadsadassddsadasdas
     * @param key
     * @param value
     */
    static setCookieItem = (key, value) => {
        Cookies.set(key, value, { sameSite: 'none', secure: true })
    };

    static removeCookie = (key) => {
        Cookies.remove(key, '')
    };

    static getCookie = (key) => {
        return Cookies.get(key);
    };

}
