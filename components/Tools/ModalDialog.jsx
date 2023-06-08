import {Modal} from "react-bootstrap";
import React from "react";
import PropTypes from "prop-types";

const ModalDialog = ({show, setShow, title, className, animation, children, size, centered, zeroPadding}) => {

    return (
        <Modal size={size} className={`${className}`} show={show} onHide={() => setShow(false)} animation={animation}
               dialogClassName={centered ? 'modal-dialog-centered' : null}>
            <div className="text-center">
                <Modal.Header closeButton className={`${zeroPadding ? 'm-0' : ''}`}>
                    <Modal.Title as="div">
                        <span>{title}</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className={`text-end ${zeroPadding ? 'p-0' : ''}`}>
                    {children}
                </Modal.Body>
            </div>
        </Modal>
    )
}

ModalDialog.defaultProps = {
    animation: false,
    size: 'lg',
    centered: false,
    withDarkMode: true,
    zeroPadding: false
}

ModalDialog.propTypes = {
    show: PropTypes.bool,
    centered: PropTypes.bool,
    zeroPadding: PropTypes.bool,
    withDarkMode: PropTypes.bool,
    title: PropTypes.string,
    className: PropTypes.string,
    animation: PropTypes.bool,
    size: PropTypes.string,
    setShow: PropTypes.func,
}


export default ModalDialog;