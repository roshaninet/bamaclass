import Head from "next/head";
import PropTypes from "prop-types";
import React from "react";
import AboutData from "@/lib/Data/AboutData";

const Headers = ({seo}) => {
    return (
        <Head>
            <title>{`${seo.title !== AboutData.title ? seo.title + " | " : ''} ${AboutData.title} `}</title>
            <meta property="og:title" content={seo.title}/>
            {
                seo.hasOwnProperty('seo') && seo.seo ?
                    <meta name="description" content={seo.seo.substr(0, 200)}/>
                    : seo.description &&
                    <meta name="description" content={seo.description.substr(0, 200)}/>
            }
            {
                seo.hasOwnProperty('seo') && seo.seo ?
                    <meta property="og:description" content={seo.seo.substr(0, 200)}/>
                    : seo.description &&
                    <meta property="og:description" content={seo.description.substr(0, 200)}/>
            }
            {
                seo.image &&
                <meta property='og:image' content={process.env.NEXT_PUBLIC_IMAGE_URL + seo.image.url}/>
            }
            {
                seo.hasOwnProperty('link') &&
                <link rel="canonical" href={process.env.NEXT_PUBLIC_BASE_URL + seo.link}/>
            }
            {
                seo.hasOwnProperty('next') &&
                <link rel="next" href={process.env.NEXT_PUBLIC_BASE_URL + seo.next}/>
            }
            {
                seo.hasOwnProperty('prev') &&
                <link rel="prev" href={process.env.NEXT_PUBLIC_BASE_URL + seo.prev}/>
            }
            {
                seo.jsonld &&
                <script type="application/ld+json" dangerouslySetInnerHTML={{__html: seo.jsonld}}/>
            }
            {
                seo.robots &&
                <meta name="robots" content={seo.robots}/>
            }

        </Head>
    )
}

Headers.propTypes = {
    seo: PropTypes.object.isRequired,
}


export default Headers;
