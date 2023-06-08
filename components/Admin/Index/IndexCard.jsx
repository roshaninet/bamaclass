import PropTypes from "prop-types";
import {useState} from "react";
import icons from "@/scss/modules/icons.module.scss";
import ActionButton from "@/components/Tools/ActionButton";
import {useRouter} from "next/router";

const IndexCard = ({loader, item, edit, remove}) => {
    const [show, setShow] = useState(false);
    const router = useRouter();

    const actions = ({
        'contents': {
            icon: icons.shBook,
            title: 'مطالب'
        },
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
            case 'contents':
                router.push(`/admin448/episodes?curseIndexId=${item.id}`);
                break;
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
            <span className='d-block fw-bold'>{item.title}</span>
            <div className='d-block font-14'>
                <span className='d-inline-block ms-3'>دوره:  <b>{item.curse?.title}</b></span>
                <span className='d-inline-block ms-3'>اولویت:  <b>{item.priority}</b></span>
                <span className='d-inline-block'>وضعیت: <b>{item.active ? <span className='text-success'>فعال</span> :
                    <span className='text-danger'>غیر فعال</span>}</b></span>
            </div>
            <ActionButton actions={actions} onAction={onAction} loader={loader} show={show} setShow={setShow}/>
        </div>
    )
}

IndexCard.propTypes = {
    item: PropTypes.object,
    onAction: PropTypes.func
}


export default IndexCard;