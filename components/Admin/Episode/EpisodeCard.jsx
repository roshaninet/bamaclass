import PropTypes from "prop-types";
import {useState} from "react";
import icons from "@/scss/modules/icons.module.scss";
import {useRouter} from "next/router";
import ActionButton from "@/components/Tools/ActionButton";
import ImageElement from "@/components/Tools/ImageElement";
import styles from "@/scss/modules/panel.module.scss";
import Link from "next/link";


const EpisodeCard = ({loader, item, edit, remove}) => {
    const [show, setShow] = useState(false);
    const router = useRouter();

    const actions = ({
        'add': {
            icon: icons.shAdd,
            title: 'افزودن ویدیو'
        },
        'videos': {
            icon: icons.shPlayButton,
            title: 'ویدیو ها'
        },
        /*
        'questions': {
            icon: icons.shAddNote,
            title: 'سوال ها'
        },
        */
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

            case 'add':
                router.push(`/admin448/videos/form?episodeId=${item.id}`);
                break;
            case 'videos':
                router.push(`/admin448/videos?episodeId=${item.id}`);
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
                <div className='col-5 align-self-center'>
                    <div className={styles.slideImageContainer}>
                        <ImageElement image={item.image || '/img/placeholder1.png'}
                                      title={item.title}
                                      className='w-100 rounded-top' width={500}
                                      height={500} url={!!item.image} objectFit={'cover'}/>
                    </div>
                </div>
                <div className='col-7 align-self-center pe-0'>
                    <div className='w-100 px-3 py-2'>
                        <span className='d-block fw-bold'>{item.title}</span>

                        <div className='d-block font-13 mb-1'>
                            <div className='d-inline-block ms-3'>درس: <b>{item.curse.title}</b></div>
                            <div className='d-inline-block ms-3'>فصل: <b>{item.curseIndex.title}</b></div>
                        </div>
                        <div className='d-block font-13 mb-1'>
                            <div className='d-inline-block ms-3'>کد: <b>{item.id}</b></div>
                            <div className='d-inline-block ms-3'>اولویت: <b>{item.priority}</b></div>
                        </div>
                        <div className='d-block font-13'>
                            <Link href={`/admin448/videos?episodeId=${item.id}`}>
                                <div
                                    className={`d-inline-block ms-1  rounded-pill text-light px-2 ${item.videos.length ? 'bg-info' : 'bg-danger'}`}>{item.videos.length} ویدیو
                                </div>
                            </Link>
                            <div
                                className='d-inline-block ms-1 bg-dark rounded-pill text-light px-2'>{item.duration} دقیقه
                            </div>
                            <div
                                className='d-inline-block ms-1 bg-dark rounded-pill text-light px-2'>{item.priceType === 1 ? 'رایگان' : 'پولی'}</div>
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

EpisodeCard.propTypes = {
    item: PropTypes.object,
    onAction: PropTypes.func
}


export default EpisodeCard;