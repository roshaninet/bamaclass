import ContainerContent from "../Layout/ContainerContent";
import {Form, Spinner} from "react-bootstrap";
import React, {useState} from "react";
import Requests from "@/lib/Requests";
import {cloneObject} from "@/lib/Functions";
import {AlertModal} from "@/components/Tools/AlertModal";
import CustomControl from "@/components/Tools/CustomControl";

const OptionPanel = ({options}) => {
    const [loader, setLoader] = useState(false);
    const [items, setItems] = useState(options);
    const [validated, setValidated] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        setValidated(true);

        if (event.target.checkValidity()) {
            setLoader(true);
            const keys = [];
            const values = [];
            for (const item of items) {
                keys.push(item.itemKey);
                values.push(item.itemValue);
            }
            const res = await Requests.postData('admin/options', {keys: keys.join(','), values: values.join(',')});
            setLoader(false);
            if (res.success) {
                await AlertModal("success", "ثبت شد", "")
            } else {
                await AlertModal("error", res.response)
            }
        }
    };

    const changeOption = (id, value) => {
        let d = cloneObject(items);
        for (const item of d) {
            if (item.itemKey === id) {
                item.itemValue = value;
            }
        }
        setItems(d);
    }

    return (
        <ContainerContent title='تنظیمات'>
            <Form className="row" noValidate validated={validated} onSubmit={handleSubmit}>
                {
                    items?.map((option, i) => {
                        return (
                            <CustomControl
                                key={`k-${i}`}
                                type={option.itemType === "text" ? "textarea" : "text"}
                                numberOnly={option.itemType === "number"}
                                pattern={option.itemType === "number" ? "\\d+" : null}
                                id={option.itemKey}
                                title={option.itemTitle}
                                value={option.itemValue}
                                className={`custom-input col-12 col-md-6`}
                                onChange={changeOption}
                                errorText={`لطفا ${option.itemTitle} را وارد نمایید.`}
                                isRequired={true}
                            />

                        )
                    })
                }

                <div className="col-12 mt-3 text-end">
                    <button type="submit"
                            className={`btn btn-danger rounded-pill`}
                            disabled={loader}>
                        {loader ? <div className='px-5'><Spinner animation="border" size="sm"/></div> :
                            <span className='px-5'>ثبت</span>}
                    </button>
                </div>
            </Form>

        </ContainerContent>
    )
}

export default OptionPanel;