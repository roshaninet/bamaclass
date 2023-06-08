import React from "react";
import '@/scss/base/base.scss'
import {wrapper} from '@/lib/Redux/Store'
import App from 'next/app';
import {getCookies} from "@/lib/Cookie";
import NProgress from 'nprogress';
import Router from 'next/router';
import {SSRProvider} from "react-bootstrap";
import {Provider} from "react-redux";
import GoogleAnalytics from "@/components/Tools/GoogleAnalytics";
import {setLoader, setMobileMode, setPager, signIn} from "@/lib/Redux/Action";


Router.onRouteChangeStart = () => {
    NProgress.start();
};

Router.onRouteChangeComplete = () => {
    NProgress.done();
};

Router.onRouteChangeError = () => {
    NProgress.done();
};


const MainApp = ({Component, ...rest}) => {
    const {store, props} = wrapper.useWrappedStore(rest);

    return (
        <>
            <Provider store={store}>
                <SSRProvider>
                    <Component {...props.pageProps} />
                </SSRProvider>
            </Provider>
            <GoogleAnalytics/>
        </>

    )
}

MainApp.getInitialProps = wrapper.getInitialAppProps(store => async (appContext) => {

    if (!process.browser) {
        let userAgent;
        if (appContext.ctx.req) { // if you are on the server and you get a 'req' property from your context
            userAgent = appContext.ctx.req.headers['user-agent'] // get the user-agent from the headers
        } else {
            userAgent = navigator.userAgent // if you are on the client you can access the navigator from the window object
        }
        let mobile = userAgent ? Boolean(userAgent.match(
            /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
        )) : false;
        // removeCookie('user', appContext.ctx);
        let cookies = getCookies(appContext.ctx);
        let user = cookies?.user;
        let pager = cookies?.pager || 12;

        if (user) {
            user = JSON.parse(decodeURIComponent(user));
        }

        store.dispatch(setPager(pager));
        store.dispatch(signIn(user));
        store.dispatch(setMobileMode(mobile));
    }

    store.dispatch(setLoader(true));
    const appProps = await App.getInitialProps(appContext);
    store.dispatch(setLoader(false));
    return {...appProps}
});

export default MainApp;
