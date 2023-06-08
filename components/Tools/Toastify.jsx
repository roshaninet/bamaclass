"use client";
import {ToastContainer} from "react-toastify";

const Toastify = () => {
    return (
        <ToastContainer
            position="bottom-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            draggable={false}
            pauseOnVisibilityChange
            closeOnClick
            pauseOnHover
            rtl
        />
    )
}
export default Toastify;