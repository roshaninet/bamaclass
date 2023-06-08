import React, {useState, useRef} from "react";
import {useRouter} from "next/router";
import {useOutsideAlerter} from "@/lib/ClientFunctions";
import Requests from "@/lib/Requests";
import styles from '@/scss/modules/panel.module.scss';
import globals from '@/scss/modules/globals.module.scss';
import icons from '@/scss/modules/icons.module.scss';
import Link from "next/link";
import ImageElement from "@/components/Tools/ImageElement";
import Logo from "@/public/img/logo/logo-dark.png";
import {ConfirmDialog} from "@/components/Tools/ConfirmDialog";

const HeaderPanel = ({user, signOut, toggleNav}) => {
    const [showProfile, setShowProfile] = useState(false);
    const router = useRouter();
    const wrapperRef1 = useRef(null);
    useOutsideAlerter(wrapperRef1, setShowProfile);

    const logOut = async () => {
        if (await ConfirmDialog('از حساب کاربری خود خارج شوید ؟')) {
            const res = await Requests.postData('logout', {})
            if (res.success) {
                signOut();

                if (user.type === 1) {
                    router.push('/admin448');
                } else {
                    if (router.pathname.indexOf("dashboard") > -1) {
                        router.push('/');
                    }
                }
            }
        }
    }

    return (
        <header className='container-fluid shadow'>
            <div className='row h-100'>
                <div className='col-auto align-self-center px-1'>
                    <button className={`btn font-22 d-flex d-md-none ${globals.btnIconOnly}`} aria-label='منوی اصلی'
                            onClick={toggleNav}>
                        <i className={icons.shMenu}/>
                    </button>
                </div>

                <div className='col align-self-center text-center text-md-end font-14 fw-bold align-self-center'>
                    <Link href={'/'}>
                        <ImageElement title='Static title' image={Logo} width={150} height={40}/>
                    </Link>
                </div>
                <div className='col-auto align-self-center ps-1 pe-0 position-relative' ref={wrapperRef1}>
                    <button className={`btn border-0 ${globals.btnIconOnly}`} aria-label='حساب کاربری'
                            onClick={() => setShowProfile(!showProfile)}>
                        <div className={`${styles.userSmallImage} `}>
                            <ImageElement className={`rounded-circle w-100 h-100 border bg-gray `} url={!!user.image}
                                          title={user?.name}
                                          image={user.image ? user.image : '/img/placeholder.jpg'}
                                          objectFit={'cover'}
                                          width={32}
                                          height={32}/>

                        </div>
                        <span className='px-1 d-none d-md-inline'>{user.name}</span>
                        <i className={`${icons.shDown} font-16`}/>
                    </button>
                    {
                        showProfile ? <div className={`${styles.subNavHead} rounded font-13`}>
                            <span className='d-block border-bottom'>
                                <Link href={`/admin448/account`}>
                                   <span className='p-2 d-block'>حساب کاربری</span>
                                </Link>
                            </span>

                            <span className='d-block'>
                                <a onClick={logOut}><span className='p-2 d-block'>خروج</span></a>
                            </span>

                        </div> : null
                    }
                </div>
            </div>


        </header>
    );
}


export default HeaderPanel;

