import Script from "next/script";
import React, {useEffect} from "react";
import {useRouter} from "next/router";

const GoogleAnalytics = () => {
    const router = useRouter();
    const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

    useEffect(() => {
        const handleRouteChange = (url) => {
            pageview(url);
        };
        router.events.on("routeChangeComplete", handleRouteChange);
        return () => {
            router.events.off("routeChangeComplete", handleRouteChange);
        };
    }, [router.events]);


    // https://developers.google.com/analytics/devguides/collection/gtagjs/pages
    const pageview = (url) => {
        window.gtag("config", GA_TRACKING_ID, {
            page_path: url,
        });
    };

    // https://developers.google.com/analytics/devguides/collection/gtagjs/events
    const event = ({action, category, label, value}) => {
        window.gtag("event", action, {
            event_category: category,
            event_label: label,
            value: value,
        });
    };


    return (
        <>
            {/* Global Site Tag (gtag.js) - Google Analytics */}
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <Script
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              page_path: window.location.pathname,
            });
          `,
                }}
            />
        </>
    )
}
export default GoogleAnalytics;
