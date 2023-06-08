import PropTypes from "prop-types";
import {useState} from "react";
import icons from "@/scss/modules/icons.module.scss";
import {useRouter} from "next/router";
import ActionButton from "@/components/Tools/ActionButton";
import ImageElement from "@/components/Tools/ImageElement";
import styles from "@/scss/modules/panel.module.scss";
import {UserRoles} from "@/lib/Data/Statics";


const UserCard = ({loader, item, edit, remove}) => {
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
    const actions = item.type !== 2 ? act : ({
        'profile': {
            icon: icons.shUser,
            title: 'مشاهده پروفایل'
        },
        'curses': {
            icon: icons.shBook,
            title: 'مشاهده دوره ها'
        },
        ...act
    });

    const onAction = async (act) => {
        switch (act) {
            case 'profile':
                router.push(`/teachers/${item.username}`);
                break;
            case 'curses':
                router.push(`/admin448/curses?userId=` + item.id);
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
        <div
            className={`w-100 shadow bg-white lh-lg p-3 position-relative rounded border-top border-2 ${item.type === 1 ? 'border-danger' : item.type === 2 ? 'border-primary' : 'border-dark'}`}>
            <div className='row'>
                <div className='col-auto align-self-center'>
                    <div className={styles.categoryImageContainer}>
                        <ImageElement image={item.image || '/img/placeholder.jpg'}
                                      title={item.title}
                                      className='w-100 h-100' width={128}
                                      height={128} url={!!item.image} objectFit={'contain'}/>
                    </div>
                </div>
                <div className='col align-self-center'>
                    <span className='d-block fw-bold'>{item.name || '-'}</span>
                    <span className='d-block font-13 text-dark'>شماره تماس: <span
                        className='fw-bold '>{item.mobile}</span></span>

                    <div className='d-block font-13'>
                          <span className='d-inline-block ms-4'>نوع:
                              <span className='px-1 fw-bold'>{UserRoles[item.type]}</span></span>
                        <span className='d-inline-block'>وضعیت: <b>{item.active ?
                            <span className='text-success'>فعال</span> :
                            <span className='text-danger'>غیر فعال</span>}</b></span>

                    </div>

                </div>
            </div>

            <ActionButton actions={actions} onAction={onAction} loader={loader} show={show} setShow={setShow}/>
        </div>
    )
}

UserCard.propTypes = {
    item: PropTypes.object,
    onAction: PropTypes.func
}


export default UserCard;