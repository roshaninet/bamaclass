import Head from "next/head";
import React, {useRef, useState} from "react";
import {connect} from "react-redux";
import {useOutsideAlerter} from "@/lib/ClientFunctions";
import SideNav from "./Layout/SideNav";
import HeaderPanel from "./Layout/HeaderPanel";
import styles from "@/scss/modules/panel.module.scss"
import icons from "@/scss/modules/icons.module.scss"
import {signIn, signOut} from "@/lib/Redux/Action";
import RoutersAdmin from "@/components/Admin/RoutersAdmin";
import dynamic from "next/dynamic";

const ToastContainer = dynamic(() => import('react-toastify').then(x => x.ToastContainer), {
    ssr: false
});

const AdminLayout = ({children, user, signOut}) => {
    const [active, setActive] = useState(false);
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, setActive);

    return (
        <div className={styles.mainDashboard}>
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
                <link rel="preload" href="/fonts/iconmoon/custom.woff2" as="font" type="font/woff2"
                      crossOrigin="anonymous"/>
                <link rel="preload" href="/fonts/iransans/regular/IRANSansWebNum.woff2" as="font" type="font/woff2"
                      crossOrigin="anonymous"/>
                <base href="/"/>
            </Head>

            {
                user && user.type === 1 ? <main className={styles.panelContainer}>
                    <div className={`${styles.sideNav} ${active ? styles.open : ''}`} ref={wrapperRef}>
                        <button className={`${styles.closeNav} d-md-none d-block`} onClick={() => setActive(!active)}>
                            <i className={icons.shQuit}/>
                        </button>
                        <SideNav menuItems={RoutersAdmin} user={user}/>
                    </div>

                    <div className={`${active ? styles.open : ''}`}>
                        <HeaderPanel user={user} signOut={signOut} toggleNav={() => setActive(!active)}/>
                        <div className='container-fluid container-contents py-3'>
                            {children}
                        </div>
                    </div>
                    {
                        active && <div className={`${styles.backDrop} d-md-none d-block`}/>
                    }
                </main> : <main className='w-100 h-100'>
                    {children}
                </main>
            }

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
        </div>
    )
}


function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps, {signIn, signOut})(AdminLayout);