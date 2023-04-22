"use client";
import React, {useState, useEffect} from "react";

const Countdown = ({targetDate}) => {
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
                (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setDays(days);
            setHours(hours);
            setMinutes(minutes);
            setSeconds(seconds);
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    return (
        <div className='row'>
            <div className='col-12 mx-auto col-md-7 col-lg-6'>
                <div className="row">
                    <div className="col-3">
                        <div
                            className='w-100 border border-dark bg-light text-dark text-center rounded py-2 py-md-3 shadow'>
                            <span className="d-block font-16">{days}</span>
                            <span className="font-14 text-black-50">روز</span>
                        </div>
                    </div>
                    <div className="col-3">
                        <div
                            className='w-100 border border-dark bg-light text-dark text-center rounded py-2 py-md-3 shadow'>
                            <span className="d-block font-16">{hours}</span>
                            <span className="font-14 text-black-50">ساعت</span>
                        </div>
                    </div>
                    <div className="col-3">
                        <div
                            className='w-100 border border-dark bg-light text-dark text-center rounded py-2 py-md-3 shadow'>
                            <span className="d-block font-16">{minutes}</span>
                            <span className="font-14 text-black-50">دقیقه</span>
                        </div>
                    </div>
                    <div className="col-3">
                        <div
                            className='w-100 border border-dark bg-light text-dark text-center rounded py-2 py-md-3 shadow'>
                            <span className="d-block font-16">{seconds}</span>
                            <span className="font-14 text-black-50">ثانیه</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Countdown;