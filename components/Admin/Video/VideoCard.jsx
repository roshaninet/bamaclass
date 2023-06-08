import PropTypes from "prop-types";
import {useState} from "react";
import icons from "@/scss/modules/icons.module.scss";
import ActionButton from "@/components/Tools/ActionButton";
import ImageElement from "@/components/Tools/ImageElement";
import styles from "@/scss/modules/panel.module.scss";


const VideoCard = ({loader, item, view, edit, remove}) => {
    const [show, setShow] = useState(false);
    const actions = {
        'view': {
            icon: icons.shEye,
            title: 'مشاهده ویدیو'
        },
        'edit': {
            icon: icons.shEdit,
            title: 'ویرایش'
        },
        'remove': {
            icon: icons.shQuit,
            title: 'حذف'
        }
    };

    const onAction = async (act) => {
        switch (act) {

            case 'view':
                view();
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
        <div className='w-100 shadow bg-white lh-lg position-relative rounded'>
            <div className='row'>
                <div className='col-4 align-self-center'>
                    <div className={styles.videoImageContainer}>
                        <ImageElement image={item.image || '/img/placeholder1.png'}
                                      title={item.title}
                                      className='w-100 bg-light rounded-top' width={240}
                                      height={500} url={!!item.image} objectFit={'cover'}/>
                    </div>
                </div>
                <div className='col-7 align-self-center pe-0'>
                    <div className='w-100 px-3 py-2'>
                        <span className='d-block fw-bold'>{item.title}</span>

                        <div className='d-block font-13 mb-1'>
                            <div className='d-inline-block ms-3'>کد ویدیو: <b>{item.id || "-"}</b></div>
                            <div className='d-inline-block ms-3'>درس: <b>{item?.episode?.curse.title || "-"}</b></div>
                            <div className='d-inline-block ms-3'>فصل: <b>{item?.episode?.curseIndex.title || "-"}</b>
                            </div>
                        </div>
                        <div className='d-block font-12'>
                            <div
                                className='d-inline-block ms-1 bg-dark rounded-pill text-light px-2'>{item.videoType === 1 ? 'لینکی' : 'پرلایک'}</div>
                            <div
                                className={`d-inline-block ms-1 rounded-pill text-light px-2 ${item.active ? 'bg-success' : 'bg-warning'}`}>{item.active ? 'فعال' : 'غیر فعال'}</div>
                        </div>
                    </div>


                </div>
            </div>

            <ActionButton actions={actions} onAction={onAction} loader={loader} show={show} setShow={setShow}/>
        </div>
    )
}

VideoCard.propTypes = {
    item: PropTypes.object,
    onAction: PropTypes.func
}


export default VideoCard;