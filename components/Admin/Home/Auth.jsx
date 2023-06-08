import React, {useState} from "react";
import ImageElement from "@/components/Tools/ImageElement";
import Authentication from "@/components/Authentication/Authentication";

const Auth = ({signIn, setAuthShow}) => {
    const [mode, formMode] = useState(0);

    return <div className='container-xl'>

        <div className='row py-5'>
            <div className='col px-0'/>
            <div className='col-11 col-md-6 text-center col-lg-5'>
                <div className='w-100 bg-white shadow pb-4 px-3 pt-4 rounded'>
                    <div className='mx-auto mb-4 mt-3'>
                        <ImageElement image={"/img/logo/logo-dark.png"} width={180} height={100}
                                      title=""/>
                    </div>
                    <div className='text-end'>
                        <Authentication/>
                    </div>
                </div>
            </div>
            <div className='col px-0'/>

        </div>

    </div>
}

export default Auth;
