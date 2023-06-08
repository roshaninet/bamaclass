import React, {useRef} from "react";
import {useOutsideAlerter} from "@/lib/ClientFunctions";
import PropTypes from "prop-types";
import {Spinner} from "react-bootstrap";
import globals from '@/scss/modules/globals.module.scss';
import icons from '@/scss/modules/icons.module.scss';

const ActionButton = ({show, setShow, actions, onAction, loader}) => {
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, setShow);

    return (
        <button className={`btn ${globals.btnIconOnly} ${globals.boxActionButton}`} aria-label='بیشتر'
                onClick={() => setShow(!show)}>
            {
                loader ? <Spinner animation="border" size="sm"/> : <i className={icons.shMore1}/>
            }
            {
                show ? <div className={`${globals.actionMenu} bg-darkmode box-shadow`} ref={wrapperRef}>
                    {
                        Object.keys(actions).map((key, i) => {
                            return (
                                <a key={`key-${i}`}
                                     onClick={() => onAction(key)}>
                                    <i className={`${actions[key].icon} d-inline-flex ms-2 font-15`}/>
                                    <span className='d-inline-flex font-13'>{actions[key].title}</span>
                                </a>
                            )
                        })
                    }
                </div> : null
            }
        </button>
    )
}

ActionButton.propTypes = {
    actions: PropTypes.object,
    onAction: PropTypes.func,
    setShow: PropTypes.func,
    loader: PropTypes.bool,
    show: PropTypes.bool
}

export default ActionButton;
