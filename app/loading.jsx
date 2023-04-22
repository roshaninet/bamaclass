"use client";
import {useEffect} from "react";
import NProgress from 'nprogress';
import Loader from "@/lib/Common/Loader";

export default function loading() {

    useEffect(() => {
        NProgress.start();
        return () => {
            NProgress.done();
        }
    }, []);

    return (
        <Loader />
    )
}