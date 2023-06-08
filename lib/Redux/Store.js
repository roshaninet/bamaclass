import {configureStore} from "@reduxjs/toolkit";
import appReducer from "./Reducer";
import {createWrapper} from "next-redux-wrapper";

const makeStore = () =>
    configureStore({
        reducer: appReducer,
        devTools: true,
    });

export const wrapper = createWrapper(makeStore, {debug: false});