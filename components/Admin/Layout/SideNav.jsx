import React from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import ImageElement from "@/components/Tools/ImageElement";
import styles from "@/scss/modules/panel.module.scss";
import globals from "@/scss/modules/globals.module.scss";
import icons from "@/scss/modules/icons.module.scss";

const SideNav = ({user, menuItems}) => {
    const router = useRouter();
    const hasPermission = (nav) => {
        if (nav.hasOwnProperty('role')) {
            return nav.role.indexOf(user.type) > -1
        } else {
            return true;
        }
    }

    return (
        <div className='w-100 h-100 overflow-auto'>
            <div className={`mx-auto mb-3 pt-5 pb-2 text-center ${styles.asideImage} ${globals.borderBottomDot}`}>
                <ImageElement width={80} height={80} lazy={false}
                              quality={60}
                              url={!!user.image}
                              className="rounded-circle border border-4 border-primary img-responsive px-md-0"
                              image={user.image ? user.image : '/img/placeholder.jpg'}
                              objectFit={'cover'}
                              title=""/>
                <span className='d-block fw-bold py-4'>{user.name}</span>
            </div>
            <div className={styles.asideContainer}>
                {
                    menuItems.map((route, i) => {
                        if (hasPermission(route)) {
                            const act = route.href === router.pathname;
                            return (
                                (
                                    <Link
                                        key={`key-${i}`}
                                        href={route.href}
                                        className={`${styles.menu} ${act ? styles.active : ''} px-3 py-2  my-2 nav-item justify-content-between d-flex align-items-center font-13`}>
                                        <div className='d-flex align-items-center'>
                                            <i className={`${route.icon} ms-3 font-20`}/>
                                            <span>{route.title}</span>
                                        </div>
                                        <i className={`${icons.shBack} font-14 ${act ? '' : 'text-black-50'}`}/>
                                    </Link>
                                )
                            );
                        } else {
                            return null
                        }

                    })
                }
            </div>

        </div>
    );
}


export default SideNav;
