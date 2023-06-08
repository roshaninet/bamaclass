import {useEffect, useState} from 'react'
import {getCookie, removeCookie, setCookieItem} from "@/lib/Cookie";


export default function useCookie(key, initialValue) {

    const [value, setValue] = useState(() => {
        const jsonValue = getCookie(key)
        if (jsonValue !== null && jsonValue !== undefined && jsonValue !== '') return JSON.parse(jsonValue)
        if (typeof initialValue === 'function') {
            return initialValue()
        } else {
            return initialValue
        }
    })

    useEffect(() => {
        if (value === null || value === undefined) {
            removeCookie(key);
        } else {
            setCookieItem(key, JSON.stringify(value));
        }
    }, [key, value])

    return [value, setValue]
}