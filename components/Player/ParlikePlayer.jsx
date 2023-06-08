"use client"
import React, {useEffect, useRef, useState} from "react";
import Hls from 'hls.js';
import Plyr from 'plyr';
import ImageElement from "@/components/Tools/ImageElement";
import {getCookie} from "@/lib/Cookie";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

// https://hlsjs.video-dev.org/demo/
const ParlikePlayer = ({src, className = "", autoPlay = false}) => {
    const videoRef = useRef(null);
    const hlsRef = useRef(null);
    const [level, setLevel] = useState(null);
    const [error, setError] = useState(false);
    useEffect(() => {
        if (level && hlsRef.current) {
            if (level === -1) {
                hlsRef.current.currentLevel = -1;
            } else {
                hlsRef.current.levels.forEach((lv, levelIndex) => {
                    if (lv.height === level) {
                        hlsRef.current.currentLevel = levelIndex;
                    }
                });
            }
        }
    }, [level])

    useEffect(() => {

        if (Hls.isSupported()) {
            const video = videoRef.current;
            const hls = new Hls({
                // autoStartLoad: false,
                xhrSetup: function (xhr, url) {
                    const t = getCookie('token');
                    xhr.setRequestHeader('Authorization', 'Bearer ' + t);
                }
            });
            const videoSrc = src.indexOf("http") > -1 ? src : `${process.env.NEXT_PUBLIC_IMAGE_URL}/${src}`;
            hls.loadSource(videoSrc);
            hls.attachMedia(video);


            hls.on(Hls.Events.ERROR, (x, y) => {
                setError(y.fatal && y.type === "networkError");
            });

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                setError(false);
                // setLevels(hls.levels);
                setLevel(hls.currentLevel);
                if (autoPlay) {
                    video.play();
                }

                const qualityOptions = hls.levels.map((quality, index) => quality.height);
                const plyrInstance = new Plyr(video, {
                    // hideControls: false,
                    // Plyr options here
                    poster: "/img/placeholder.jpg",
                    captions: {active: true, update: true, language: 'fa'},
                    settings: ['captions', 'quality', 'speed', 'loop'],
                    controls: ['play-large', 'fastForward', 'play', 'progress', 'current-time', 'duration', 'quality', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen'],
                    quality: {
                        default: hls.currentLevel,
                        options: [-1, ...qualityOptions],
                        forced: true,
                        onChange: (quality) => {
                            setTimeout(() => {
                                setLevel(quality);
                            }, 50)
                        },
                    },
                    markers: {
                        enabled: true,
                        points: [
                            //{time: 10, label: "مبحث تست سیستم"},
                            //{time: 50, label: "مبحث تست سیستم"},
                            //{time: 2000, label: "مبحث تست سیستم"}
                        ]
                    },
                    i18n: {
                        speed: 'سرعت',
                        normal: 'معمولی',
                        quality: 'کیفیت',
                        restart: 'شروع مجدد',
                        rewind: 'عقب',
                        play: 'پخش',
                        pause: 'توقف',
                        fastForward: 'جلو',
                        seek: 'جستجو',
                        played: 'پخش شده',
                        buffered: 'بافر شده',
                        currentTime: 'زمان کنونی',
                        duration: 'مدت',
                        volume: 'صدا',
                        mute: 'بی‌صدا',
                        unmute: 'با صدا',
                        enableCaptions: 'فعالسازی زیرنویس',
                        disableCaptions: 'غیرفعالسازی زیرنویس',
                        enterFullscreen: 'تمام صفحه',
                        exitFullscreen: 'خروج از حالت تمام صفحه',
                        qualityLabel: {
                            "-1": "خودکار"
                        }
                    }
                });


                hlsRef.current = hls;

                // Custom logo element
                const logoElement = document.createElement('div');
                logoElement.classList.add('custom-logo');
                // Add your logo image or any custom logo content
                logoElement.innerHTML = '<a href="/" target="_blank"><img src="/img/logo/fav.png" alt="Logo" /></a>';

                // Add the custom logo to the controls
                const controls = plyrInstance.elements.controls;
                controls.appendChild(logoElement);
                videoRef.current = plyrInstance;
            });

            // Initialize Plyr


        } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
            videoRef.current.src = src.indexOf("http") > -1 ? src : `${process.env.NEXT_PUBLIC_IMAGE_URL}${src}`;
            if (autoPlay) {
                videoRef.current.play();
            }
        }

        return () => {
            if (Hls.isSupported()) {
                if (hlsRef.current) {
                    hlsRef.current.hls?.destroy();
                }
            }
        };
    }, [src, autoPlay]);

    return (
        error ?
            <ImageElement image='/img/video-placeholder.png'
                          title={"Video error"}
                          className='w-100 rounded'
                          width={1280}
                          height={720}
                          url={false}
                          objectFit={'cover'}/> :
            <div className={className}>
                <video ref={videoRef} controls></video>
            </div>
    );
};

export default ParlikePlayer;