import PropTypes from "prop-types";
import {useState} from "react";
import icons from "@/scss/modules/icons.module.scss";
import ActionButton from "@/components/Tools/ActionButton";

const FaqCard = ({loader, item, edit, remove}) => {
    const [show, setShow] = useState(false);

    const actions = ({
        'edit': {
            icon: icons.shEdit,
            title: 'ویرایش'
        },
        'remove': {
            icon: icons.shQuit,
            title: 'حذف'
        }
    })

    const onAction = async (act) => {
        switch (act) {
            case 'edit':
                edit();
                break;
            case 'remove':
                remove();
                break;
        }
    }

    return (
        <div className='w-100 shadow bg-white lh-lg p-3 position-relative rounded'>
            <span className='d-block fw-bold'>{item.question}</span>
            <span className='d-block font-12 lg-lh'>{item.answer}</span>
            <div className='d-block font-14'>
                <span className='d-inline-block'>وضعیت: <b>{item.active ? <span className='text-success'>فعال</span> :
                    <span className='text-danger'>غیر فعال</span>}</b></span>
            </div>
            <ActionButton actions={actions} onAction={onAction} loader={loader} show={show} setShow={setShow}/>
        </div>
    )
}

FaqCard.propTypes = {
    item: PropTypes.object,
    onAction: PropTypes.func
}


export default FaqCard;