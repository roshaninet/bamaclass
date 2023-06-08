import {Modal} from "react-bootstrap";
import React from "react";
import PropTypes from "prop-types";
import {confirmable, createConfirmation} from "@/lib/Rc";
import icons from "@/scss/modules/icons.module.scss"
import styles from '@/scss/modules/dialog.module.scss';

const AlertModalContainer = ({show, proceed, type, title, content, buttonText}) => {
    return (
        <Modal show={show} onHide={() => proceed(false)} animation={false} size='md'
               dialogClassName='modal-dialog-centered'>
            <div className={`bordered-modal ${styles.alertModal} text-end`}>
                <Modal.Header className={styles.modalHeader}>
                    {
                        {
                            'success': <i className={`${icons.shCheckedFill} ${styles[type]}`}/>,
                            'warning': <i className={`${icons.shWarning} ${styles[type]}`}/>,
                            'info': <i className={`${icons.shWarning} ${styles[type]}`}/>,
                            'error': <i className={`${icons.shQuit} ${styles[type]}`}/>,
                        }[type]
                    }
                </Modal.Header>
                <Modal.Body className="text-center">
                    <span className={`d-block font-16 fw-bold ${styles[type]}`}>{title}</span>
                    <span className={`d-block my-3 font-13 pre-line`}
                          dangerouslySetInnerHTML={{__html: content}}/>
                    <button className={`btn mx-auto bg-info`} onClick={() => proceed(false)}>{buttonText}</button>
                </Modal.Body>
            </div>
        </Modal>
    )
}


AlertModalContainer.defaultProps = {
    buttonText: 'تایید !',
    type: 'success',
}

AlertModalContainer.propTypes = {
    title: PropTypes.string,
    type: PropTypes.string,
    content: PropTypes.any,
    buttonText: PropTypes.string,
}

export function AlertModal(
    type,
    title,
    content,
    buttonText = "بله!",
) {
    return createConfirmation(confirmable(AlertModalContainer))({
        type,
        title,
        content,
        buttonText
    });
}
