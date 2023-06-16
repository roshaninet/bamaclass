import PropTypes from "prop-types";
import {useState} from "react";
import icons from "@/scss/modules/icons.module.scss";
import {useRouter} from "next/router";
import ActionButton from "@/components/Tools/ActionButton";
import ImageElement from "@/components/Tools/ImageElement";
import styles from "@/scss/modules/panel.module.scss";


const CategoryCard = ({loader, item, edit, remove}) => {
    const [show, setShow] = useState(false);
    const router = useRouter();

    const act = ({
        'edit': {
            icon: icons.shEdit,
            title: 'ویرایش'
        },
        'remove': {
            icon: icons.shQuit,
            title: 'حذف'
        }
    })
    const actions = item.parent?.parent ? act : ({
        'childes': {
            icon: icons.shLocation,
            title: 'فرزندان'
        },
        ...act
    });

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
        <div className='w-100 shadow bg-white lh-lg p-3 position-relative rounded'>
            <div className='row'>
                <div className='col-auto align-self-center'>
                    <div className={styles.categoryImageContainer}>
                        <ImageElement image={item.icon || '/img/placeholder1.png'}
                                      title={item.title}
                                      className='w-100 h-100' width={128}
                                      height={128} url={!!item.icon} objectFit={'cover'}/>
                    </div>
                </div>
                <div className='col align-self-center'>
                    <span className='d-block fw-bold'>{item.title}</span>
                    <span className='d-block font-14'>اسلاگ: <span className='fw-bold '>{item.slug}</span></span>

                    <div className='d-block font-14'>
                <span className='d-inline-block'>وضعیت: <b>{item.active ? <span className='text-success'>فعال</span> :
                    <span className='text-danger'>غیر فعال</span>}</b></span>
                        {
                            !item.parent?.parent ?
                                <span className='d-inline-block me-4'>فرزندان:
                                    <a className='fw-bold'
                                       onClick={(event) => {
                                           event.preventDefault();
                                           event.stopPropagation();
                                           onAction('childes').then(r => {
                                           });
                                       }}>{item.childes?.length}</a></span> : null
                        }
                    </div>

                </div>
            </div>

            <ActionButton actions={actions} onAction={onAction} loader={loader} show={show} setShow={setShow}/>
        </div>
    )
}

CategoryCard.propTypes = {
    item: PropTypes.object,
    onAction: PropTypes.func
}


export default CategoryCard;