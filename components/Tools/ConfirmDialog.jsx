import React from 'react';
import PropTypes from 'prop-types';
import {createConfirmation, confirmable} from '@/lib/Rc';
import {Modal} from 'react-bootstrap';
import styles from '@/scss/modules/dialog.module.scss';
import icons from "@/scss/modules/icons.module.scss";

const Confirmation = ({show, proceed, confirmation, okLabel, cancelLabel}) => {
    return (
        <Modal show={show} onHide={() => proceed(false)} animation={false} size='md'
               dialogClassName='modal-dialog-centered'>
            <div className={`bordered-modal ${styles.alertModal} text-end`}>
                <Modal.Header className={styles.modalHeader}>
                    <i className={`${icons.shAlarm} text-info`}/>
                </Modal.Header>
                <Modal.Body className="w-100 py-5">
                    <span className={`d-block font-16 fw-bold text-center`}>{confirmation}</span>
                    <div className='w-100 mt-4 text-center'>
                        <button className="btn btn-outline-danger font-17 ms-2 px-3 px-5"
                                onClick={() => proceed(false)}>{cancelLabel}</button>
                        <button className={`btn px-2 px-5 font-17 bg-info text-white`}
                                onClick={() => proceed(true)}>{okLabel}</button>
                    </div>
                </Modal.Body>
            </div>
        </Modal>
    )

}

Confirmation.propTypes = {
    okLabel: PropTypes.string,
    cancelLabel: PropTypes.string,
    title: PropTypes.string,
    confirmation: PropTypes.string,
    show: PropTypes.bool,
    proceed: PropTypes.func, // called when ok button is clicked.
    enableEscape: PropTypes.bool
};

export function ConfirmDialog(
    confirmation,
    okLabel = "بله!",
    cancelLabel = "خیر"
) {
    return createConfirmation(confirmable(Confirmation))({
        confirmation,
        okLabel,
        cancelLabel
    });
}
