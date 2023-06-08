import PropTypes from "prop-types";
import {useState} from "react";
import icons from "@/scss/modules/icons.module.scss";
import {useRouter} from "next/router";
import ActionButton from "@/components/Tools/ActionButton";
import ImageElement from "@/components/Tools/ImageElement";
import styles from "@/scss/modules/panel.module.scss";


const SlideCard = ({loader, item, edit, remove, categories}) => {
    const [show, setShow] = useState(false);
    const router = useRouter();

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
            case 'childes':
                router.push(`/admin448/categories?parentId=${item.id}`);
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
                <div className='col-12 align-self-center'>
                    <div className={styles.slideImageContainer}>
                        <ImageElement image={item.image || '/img/placeholder1.png'}
                                      title={item.title}
                                      className='w-100 rounded-top' width={500}
                                      height={500} url={!!item.image} objectFit={'contain'}/>
                    </div>
                </div>
                <div className='col-12'>
                    <div className='w-100 px-3 py-2'>
                        <span className='d-block fw-bold'>{item.title}</span>

                        <div className='d-block font-13'>
                            <div className='d-inline-block ms-3'>نمایش: <b>{item.itemType === 1 ?
                                <span className='text-dark'>دسکتاپ</span> :
                                <span className='text-dark'>موبایل</span>}</b>
                            </div>
                            <div className='d-inline-block ms-3'>نوع: <b>{item.itemType === 1 ?
                                <span className='text-success'>صفحه اصلی</span> :
                                <span className='text-primary'>{categories[item.itemId]}</span>}</b>
                            </div>
                            <div className='d-inline-block'>وضعیت: <b>{item.active ?
                                <span className='text-success'>فعال</span> :
                                <span className='text-danger'>غیر فعال</span>}</b>
                            </div>

                        </div>
                    </div>


                </div>
            </div>

            <ActionButton actions={actions} onAction={onAction} loader={loader} show={show} setShow={setShow}/>
        </div>
    )
}

SlideCard.propTypes = {
    item: PropTypes.object,
    onAction: PropTypes.func
}


export default SlideCard;