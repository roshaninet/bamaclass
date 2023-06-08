import {useEffect, useState} from "react";
import {AlertModal} from "@/components/Tools/AlertModal";
import {Form, Spinner} from "react-bootstrap";
import InputCode from "@/components/Tools/InputCode";
import {ConfirmDialog} from "@/components/Tools/ConfirmDialog";
import Requests from "@/lib/Requests";
import md5 from "md5";
import CircularProgress from "@/components/Tools/CircularProgress";

const VerifyForm = ({mobile, signIn, cancel, val}) => {
    const counter = 180;
    const [loader, setLoader] = useState(false);
    const [validated, setValidated] = useState(false);
    const [code, setCode] = useState("");
    const [tokens, setTokens] = useState([]);
    const [countdown, setCountdown] = useState(counter);

    useEffect(() => {
        if (code.length === 6) {
            login().then(() => {
            });
        }
    }, [code])

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown > 0 ? prevCountdown - 1 : prevCountdown);
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        setValidated(true);

        if (event.target.checkValidity()) {
            await login();
        } else {
            const list = event.target.querySelectorAll(':invalid');
            list[0].focus();
        }
    }


    const resendCode = async () => {
        setLoader(true);
        const secret = md5(mobile + val);
        const res = await Requests.postData("verify", {mobile, secret});
        setLoader(false);
        if (res.success) {
            resetTimer();
        } else {
            await AlertModal("error", "خطا", res.message);
        }
    }

    const removeAndLogin = async (token) => {
        if (await ConfirmDialog("از حذف دستگاه و ورود به سیستم اطمینان دارید؟")) {
            await login(token);
        }
    }

    const resetTimer = () => {
        setCountdown(counter)
    }

    const login = async (removeToken = "") => {
        setLoader(true);
        const secret = md5(code + val);
        const res = await Requests.postData("login", {mobile, verifyCode: code, removeToken, secret});
        setLoader(false);
        if (res.success) {
            signIn(res.response.user, res.response.token);
        } else {
            if (res.message === "TokenLimit") {
                setTokens(res.response);
            } else {
                await AlertModal("error", "خطا", res.message);
            }
        }
    }

    return (
        tokens.length ?
            <div className='row'>
                <div className='col-12 text-center'>
                    <span className='font-13 mb-3 d-block'>برای ورود به سیستم از یکی از سیستم های زیر خروج کنید.</span>
                </div>
                <div className='col-12 text-center'>
                    {
                        loader ? <div className='w-100'>
                            <Spinner animation='border' size='lg'/>
                        </div> : tokens.map((token, i) => {
                            return (
                                <div key={`token-${i}`} className='w-100 bg-light rounded p-3 my-3'>
                                        <span className='d-block mb-3 font-14'>
                                            {token.os} - {token.browser}
                                        </span>
                                    <button className='btn btn-danger' onClick={() => removeAndLogin(token.id)}
                                            disabled={loader}>حذف و ورود
                                    </button>
                                </div>
                            )
                        })
                    }
                </div>
            </div> :
            <Form id="verify-form" className="row my-3" noValidate validated={validated} onSubmit={handleSubmit}>
                <div className='col-12 text-center'>
                    <span className='font-13 mb-3 d-block'> کد ارسال شده به <span
                        className='color-blue fw-bold'>{mobile}</span> را وارد کنید</span>
                </div>
                <div className='col-12 ltr mb-4'>
                    <InputCode
                        length={6}
                        loading={loader}
                        onComplete={c => {
                            setCode(c);
                        }}
                    />
                </div>
                {
                    loader ? <div className='w-100 py-3 text-center'>
                            <Spinner animation='border' size='lg'/>
                        </div> :
                        <>
                            {
                                countdown > 0 ? <div className='col-12 text-center mt-2'>
                                    <CircularProgress radius={35} strokeWidth={5} value={countdown}
                                                      progress={(100 * (180 - countdown) / 180)}/>
                                    <span className='d-block font-11 mt-2'>ثانیه مانده تا ارسال مجدد کد</span>
                                </div> : <div className='col-12 text-center mt-2'>
                                    <button type="button" onClick={resendCode} className='btn btn-light btn-sm'
                                            disabled={countdown > 0}>
                                        ارسال مجدد
                                    </button>
                                </div>
                            }
                            <div className='col-12 text-center mt-3'>
                                <button
                                    type="button"
                                    onClick={cancel}
                                    className='btn btn-outline-primary fw-bold btn-sm mt-2 font-12  rounded-pill px-5'
                                    disabled={loader}>
                                    <span>تغییر شماره تماس</span>
                                </button>
                            </div>
                        </>
                }

            </Form>
    )
}

export default VerifyForm;