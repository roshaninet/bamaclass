import Head from "next/head";
import React from "react";
import {connect} from "react-redux";
import {setAuthShow, signIn, signOut} from "@/lib/Redux/Action";
import Footer from "@/components/Pages/Layouts/Footer";
import HeaderMobile from "@/components/Pages/Layouts/HeaderMobile";
import HeaderWeb from "@/components/Pages/Layouts/HeaderWeb";
import dynamic from "next/dynamic";

const AuthModal = dynamic(() => import('@/components/Authentication/AuthModal'), {
    ssr: false
});
const Layout = ({children, user, authShow, isLogin, isMobile, setAuthShow, signIn, signOut}) => {

    return (
        <div className="main">
            <Head>
                <meta name="viewport" content="initial-scale=1,user-scalable=no,maximum-scale=1,width=device-width"/>
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8"/>
                <meta charSet="utf-8"/>
                <meta httpEquiv="content-language" content="fa"/>
                <meta name="language" content="fa"/>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
                <link rel="apple-touch-icon" sizes="180x180" href="/img/ico/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/img/ico/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/img/ico/favicon-16x16.png"/>
                <link rel="manifest" href="/img/ico/site.webmanifest"/>
                <meta name="msapplication-TileColor" content="#8560FC"/>
                <meta name="theme-color" content="#ffffff"/>
                <link rel="preload" href="/fonts/iransans/regular/IRANSansWeb.woff2" as="font" type="font/woff2"
                      crossOrigin="anonymous"/>
                <link rel="preload" href="/fonts/iransans/bold/IRANSansWeb_Bold.woff2" as="font" type="font/woff2"
                      crossOrigin="anonymous"/>
                <base href="/"/>
            </Head>

            {
                isMobile ? <HeaderMobile user={user} isLogin={isLogin} setAuthShow={setAuthShow} signOut={signOut}/> :
                    <HeaderWeb user={user} isLogin={isLogin} setAuthShow={setAuthShow} signOut={signOut}/>
            }
            <main>
                {children}
            </main>
            <Footer/>
            <AuthModal setAuthShow={setAuthShow} authShow={authShow} signIn={signIn}/>
        </div>
    )
}


function mapStateToProps(state) {
    return {
        authShow: state.authShow,
        isMobile: state.isMobile,
        isLogin: state.isLogin,
        user: state.user
    };
}

export default connect(mapStateToProps, {setAuthShow, signIn, signOut})(Layout);
