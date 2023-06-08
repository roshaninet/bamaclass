"use client";
import {useState} from "react";
import ValidateForm from "@/components/Authentication/ValidateForm";
import VerifyForm from "@/components/Authentication/VerifyForm";
import {connect} from "react-redux";
import {signIn} from "@/lib/Redux/Action";

const Authentication = ({signIn}) => {
    const [mobile, setMobile] = useState('');
    const s = process.env.NEXT_PUBLIC_SECRET_KEY
    return (
        <div className='w-100'>
            {mobile ? <VerifyForm val={s} cancel={() => setMobile("")} signIn={signIn} mobile={mobile}/> :
                <ValidateForm val={s} onDone={(mob) => setMobile(mob)}/>}
        </div>
    )
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps, {signIn})(Authentication);
