import {mustRedirect, objectToQueryString} from "./Functions";
import {getCookie, removeCookie} from "./Cookie";
import axios from "axios";

class Requests {

    static async sendRequest(route, data, method, ctx = null, formData = false, onProgress = () => {
    }) {
        let response = {};
        let status = 200;
        const apiUrl = typeof window !== 'undefined' ? process.env.NEXT_PUBLIC_API_URL : process.env.API_URL;
        let requestUrl = apiUrl + route;
        let header = Requests.getHeader(ctx ? ctx.req : null, formData);


        const options = {
            url: encodeURI(requestUrl),
            method: method,
            data: data,
            validateStatus: false,
            onUploadProgress: (progressEvent) => {
                console.log(progressEvent);
                const percentCompleted = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                );
                onProgress(percentCompleted);
            },
            headers: header
        };
        response = await axios(options);
        console.log(response.data);
        return Requests.prepareResponse(response.data, response.status, ctx);
    }

    static async getData(route, data = null, ctx = null) {
        let queryString = objectToQueryString(data);
        route += queryString;

        return await this.sendRequest(route, null, 'GET', ctx);
    }

    static async postData(route, data) {
        return await this.sendRequest(route, JSON.stringify(data), 'POST');
    }

    static async putData(route, data) {
        return await this.sendRequest(route, JSON.stringify(data), 'PUT');
    }

    static async deleteData(route, data) {
        return await this.sendRequest(route, JSON.stringify(data), 'Delete');
    }

    static async postFormData(route, data, onProgress = () => {
    }) {
        return await this.sendRequest(route, data, 'POST', null, true, onProgress);
    }

    static getHeader(req, formData = false) {
        let context = req ? {req: req} : null;
        const token = getCookie('token', context);
        let headers = {
            // 'X-Requested-With': 'XMLHttpRequest',
        };
        if (!formData) {
            headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=utf-8'
            }
        }
        // console.log(token);
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }
        return headers;
    }

    static prepareResponse(response, status, ctx) {
        switch (status) {
            case 200:
                return {
                    success: response.success,
                    response: response.object,
                    message: response.message
                }
            case 400:
            case 422:
                let message = '';
                if (response.hasOwnProperty('errors')) {
                    Object.keys(response['errors']).forEach((key) => {
                        message += response['errors'][key][0] + '\r\n';
                    });
                    return {
                        success: false,
                        response: message,
                        message: message
                    }
                } else {
                    return {
                        success: response.success,
                        response: response.object,
                        message: response.message
                    }
                }
                break;

            case 403:
                if (ctx && ctx.res) {
                    ctx.res.writeHead(403, {Location: `/`});
                    ctx.res.end();
                } else {
                    window.location.href = '/'
                }
                break;
            case 401:
                if (ctx) {
                    //ctx.store.dispatch(signOut());
                    if (ctx.res) {
                        mustRedirect('/', ctx);
                    } else {
                        removeCookie('user');
                        window.location.href = '/'
                    }
                } else {
                    removeCookie('user');
                    window.location.href = '/'
                }
                return {
                    success: false,
                    response: 401,
                }
            case 0:
            case 503:
                return {
                    success: false,
                    response: 503,
                }

            case 404:
                if (ctx && ctx.res) {
                    ctx.res.writeHead(301, {Location: `/404`});
                    ctx.res.end();
                }
                return {
                    success: false,
                    response: 404,
                }
            default:
                return {
                    success: false,
                    response: 'خطای دریافت داده ها',
                    message: response.message
                }
        }

    }
}

export default Requests;
