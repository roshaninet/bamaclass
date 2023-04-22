"use client";
import React, {useEffect, useState} from "react";

const useCheckMobileScreen = (defaultValue) => {
    if (typeof window !== 'undefined') {
        const [width, setWidth] = useState(window?.innerWidth);

        useEffect(() => {
            window.addEventListener('resize', handleWindowSizeChange);
            return () => {
                window.removeEventListener('resize', handleWindowSizeChange);
            }
        }, [defaultValue]);

        const handleWindowSizeChange = () => {
            setWidth(window?.innerWidth);
        }

        return (width <= 768);
    }

    return defaultValue;

}

export default useCheckMobileScreen