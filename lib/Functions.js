export const slugify = (str) => {
    const array = str.split(' ');
    const sliced = array.splice(0, 5).filter(x => x);
    return sliced.join('-');
}


export const formDataToJson = (formData) => {
    let object = {};
    formData.forEach(function (value, key) {
        object[key] = value;
    });
    return object;
}

export const cloneObject = (object) => {
    return (JSON.parse(JSON.stringify(object)))
}

export const objectToQueryString = (object) => {
    let keys = object ? Object.keys(object) : [];
    let queryString = [];
    if (keys.length) {
        for (const key of keys) {
            queryString.push(key + "=" + object[key]);
        }
    }

    return (queryString.length ? '?' : '') + queryString.join('&');
}

export const prepareLink = (link) => {
    return link.replace('https://engamoozesh.com', '').replace('http://engamoozesh.com', '');
}


export const parseArabic = (str) => {
    return str.replace(/[٠١٢٣٤٥٦٧٨٩]/g, function (d) {
        return d.charCodeAt(0) - 1632;
    }).replace(/[۰۱۲۳۴۵۶۷۸۹]/g, function (d) {
        return d.charCodeAt(0) - 1776;
    });
}

export const cleanObject = (obj) => {
    for (const propName in obj) {
        if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
            delete obj[propName];
        }
    }
}

export const isNumber = (num) => {
    return !isNaN(parseInt(num));
}

export const mustRedirect = (link, ctx = null) => {
    if (ctx && ctx.res) {
        ctx.res.writeHead(301, {Location: encodeURI(link)});
        ctx.res.end();
    } else {
        window.location.href = link;
    }
}

export const reload = async (router, timer = 0) => {
    setTimeout(() => {
        router.push({
            pathname: router.pathname,
            query: router.query
        });
    }, timer);
}

export const numberToObject = (number, start = 0) => {
    let obj = {};
    for (let i = start; i < number; i++) {
        obj[i] = i;
    }
    return obj;
}

export const truncate = (source, size) => {
    return source.length > size ? source.slice(0, size - 1) + "…" : source;
}

export const numberFormat = (input) => {
    let isInt = parseInt(input) > 0;
    if (isInt) {
        input = input.toString();
        return input.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    return input;
}

export const priceFormat = (input) => {
    return parseInt(input) > 0 ? `${numberFormat(input)} تومان` : "تماس بگیرید"
}

export const add = (accumulator, a) => {
    return accumulator + a;
}

export const removeDuplicates = (arr) => {
    let unique = [];
    for (let i = 0; i < arr.length; i++) {
        if (unique.indexOf(arr[i]) === -1) {
            unique.push(arr[i]);
        }
    }
    return unique;
}


export const canonicalLink = (link) => {
    return `${process.env.NEXT_PUBLIC_BASE_URL}${link}`;
}

/**
 const text = "2:22 This is test \r\n 3:44 Test \r\n continue of text \r\n 23:23 introduction";
 const regex = /(^\d{1,2}:\d{2})\s+([^\r\n]+)/g;
 let match;
 let times = [];
 let titles = [];

 while ((match = regex.exec(text)) !== null) {
        times.push(match[1]);
        titles.push(match[2].trim());
    }

 console.log(times); // ["2:22", "3:44", "23:23"]
 console.log(titles); // ["This is test", "Test", "int"]
 */