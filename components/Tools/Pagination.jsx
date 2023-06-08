"use client";

import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import {cloneObject} from "@/lib/Functions";
import Link from "next/link";
import styles from '@/scss/modules/pagination.module.scss';
import icons from "@/scss/modules/icons.module.scss"

const Pagination = ({parameters, page, pages, perPage, total, max, type}) => {
    const [links, setLinks] = useState([]);

    useEffect(() => {
        let params = cloneObject(parameters);
        delete params.params;
        delete params.pager;
        let path = `/${type}`;
        let key = 'page';

        let l = [];

        if (page > 1) {
            let prev = page - 1
            l.push({
                obj: <i className={icons.shGo}/>,
                link: {
                    pathname: path,
                    query: {...params, [key]: prev},
                },
                page: prev,
                current: false
            });
        }

        let start = page - Math.floor(max / 2);
        let count = 0;
        while (count < max && start <= pages) {
            if (start > 0) {
                l.push({
                    obj: <span>{start}</span>,
                    link: {
                        pathname: path,
                        query: {...params, [key]: start},
                    },
                    page: start,
                    current: start === page
                });
                count++;
            }
            start++;
        }
        setLinks(l);
    }, [page, parameters])

    if (pages > 1) {
        return (
            <div className="col-12 text-center">
                {
                    pages > 0 &&
                    <div className="mt-3 text-center">
                        {
                            links.length &&
                            <ul className={`${styles.pagination} text-center mx-auto`}>
                                {
                                    links.map((link, i) => {
                                        return (
                                            <li key={`paginate-${i}`}
                                                className={`${link.current ? styles.current : ''}`}>
                                                <Link href={link.link}>
                                                    {link.obj}
                                                </Link>
                                            </li>
                                        );
                                    })
                                }
                            </ul>
                        }
                        <span className="d-block font-13 my-2">
                            {((page - 1) * perPage) + 1} - {page * perPage} از {total}
                        </span>
                    </div>
                }

            </div>
        );
    } else {
        return null;
    }

}

Pagination.propTypes = {
    parameters: PropTypes.any.isRequired,
    page: PropTypes.number.isRequired,
    pages: PropTypes.number.isRequired,
    perPage: PropTypes.any.isRequired,
    total: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    type: PropTypes.string
}

export default Pagination;
