"use client";
import {Form, Spinner} from "react-bootstrap";
import CustomControl from "@/components/Tools/CustomControl";
import {useState} from "react";
import Requests from "@/lib/Requests";
import {AlertModal} from "@/components/Tools/AlertModal";
import md5 from "md5";

const ValidateForm = ({onDone, val}) => {
    const [loader, setLoader] = useState(false);
    const [validated, setValidated] = useState(false);
    const [mobile, setMobile] = useState("");
    const handleSubmit = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        setValidated(true);

        if (event.target.checkValidity()) {
            setLoader(true);
            const secret = md5(mobile + val);
            const res = await Requests.postData("verify", {mobile, secret});
            setLoader(false);
            if (res.success) {
                onDone(mobile);
            } else {
                await AlertModal("error", "خطا", res.message);
            }
        } else {
            const list = event.target.querySelectorAll(':invalid');
            list[0].focus();
        }
    }
    return (
        <Form className="row my-3" noValidate validated={validated} onSubmit={handleSubmit}>
            <div className='col-12 text-center'>
                <span className='font-13 mb-3 d-block'>شماره موبایل خود را وارد کنید</span>
            </div>
            <CustomControl
                id={'mobile'}
                type={'text'}
                className='custom-input gr col-12 text-end'
                value={mobile}
                pattern="09[0-9]{9}"
                onChange={(id, val) => setMobile(val)}
                isRequired={true}
                numberOnly={true}
                errorText={'شماره موبایل ۱۱ رقمی را وارد کنید .'}
                title={'شماره موبایل'}/>

            <div className='col-12 text-center'>
                <button className='btn btn-primary rounded-pill px-5' disabled={loader}>
                    {loader ? <Spinner animation='border' size="sm"/> : <span>ورود</span>}
                </button>
            </div>
        </Form>

    )
}

export default ValidateForm;