import PropTypes from "prop-types";
import {useState} from "react";
import icons from "@/scss/modules/icons.module.scss";
import {useRouter} from "next/router";
import ActionButton from "@/components/Tools/ActionButton";
import ImageElement from "@/components/Tools/ImageElement";
import styles from "@/scss/modules/panel.module.scss";
import {CursePricing} from "@/lib/Data/Statics";
import {numberFormat} from "@/lib/Functions";


const CurseCard = ({loader, item, edit, remove, teachers, categories}) => {
    const [show, setShow] = useState(false);
    const router = useRouter();

    const actions = ({
        'manage': {
            icon: icons.shList2,
            title: 'مدیریت محتوا'
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
            case 'manage':
                router.push(`/admin448/indices?curseId=${item.id}`);
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
            <div className='row'>
                <div className='col-auto align-self-center'>
                    <div className={styles.curseImageContainer}>
                        <ImageElement image={item.image || '/img/placeholder1.png'}
                                      title={item.title}
                                      className='w-100 h-100 rounded bg-dark' width={200}
                                      height={200} url={!!item.image} objectFit={'cover'}/>
                    </div>
                </div>
                <div className='col align-self-center'>
                    <span className='d-block fw-bold'>{item.title}</span>
                    <span className='d-block font-12'>مدرس: <b>{item.user.name}</b></span>
                    <span className='d-block font-12'>دسته: <b>{item.category.title}</b></span>
                    <div className='d-lg-block mt-2 d-none font-13'>
                        <div
                            className='d-inline-block ms-1 bg-dark rounded-pill text-light px-2'>{CursePricing[item.priceType]}</div>
                        {
                            item.price ? <div
                                className='d-inline-block ms-1 bg-dark rounded-pill text-light px-2'>{numberFormat(item.price)} تومان</div> : null
                        }
                        {
                            item.discount ? <div
                                className='d-inline-block ms-1 bg-danger rounded-pill text-light px-2'>{item.discount}%</div> : null
                        }
                        <div
                            className={`d-inline-block ms-1 rounded-pill text-light px-2 ${item.active ? 'bg-success' : 'bg-warning'}`}>{item.active ? 'فعال' : 'غیر فعال'}</div>
                    </div>
                </div>
                <div className='col-12 mt-2 d-lg-none'>
                    <div className='d-block font-13'>
                        <div
                            className='d-inline-block ms-1 bg-dark rounded-pill text-light px-2'>{CursePricing[item.priceType]}</div>
                        {
                            item.price ? <div
                                className='d-inline-block ms-1 bg-dark rounded-pill text-light px-2'>{numberFormat(item.price)} تومان</div> : null
                        }
                        {
                            item.discount ? <div
                                className='d-inline-block ms-1 bg-danger rounded-pill text-light px-2'>{item.discount}%</div> : null
                        }
                        <div
                            className={`d-inline-block ms-1 rounded-pill text-light px-2 ${item.active ? 'bg-success' : 'bg-warning'}`}>{item.active ? 'فعال' : 'غیر فعال'}</div>
                    </div>
                </div>
            </div>

            <ActionButton actions={actions} onAction={onAction} loader={loader} show={show} setShow={setShow}/>
        </div>
    )
}

CurseCard.propTypes = {
    item: PropTypes.object,
    onAction: PropTypes.func
}


export default CurseCard;