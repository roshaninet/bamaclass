import PropTypes from "prop-types";
import {Form} from "react-bootstrap";
import React, {useState} from "react";
import {parseArabic} from "@/lib/Functions";
import icons from "@/scss/modules/icons.module.scss"
import {numberToString} from "@/lib/Numberstring";
import dynamic from "next/dynamic";


const SingleFileUploaderZone = dynamic(() => import('./SingleFileUploaderZone'), {
    ssr: false
});

const SingleUploaderZone = dynamic(() => import('./SingleUploaderZone'), {
    ssr: false
});


const CustomControl = ({
                           id,
                           title,
                           value,
                           type,
                           onChange = (id, val) => {
                           },
                           pattern,
                           isRequired,
                           className,
                           sample,
                           help,
                           errorText,
                           counter,
                           options,
                           placeholder,
                           numberOnly,
                           showString,
                           disabled
                       }) => {
    const [show, setShow] = useState(false);
    const [showPass, setShowPass] = useState(false);

    const changeHandler = (event) => {
        const key = event.target.id.split('-')[0];
        let value = (type === 'check' || type === 'toggle') ? event.target.checked ? 1 : 0 : event.target.value;

        if (numberOnly) {
            value = parseArabic(value);
        }
        onChange(key, value);
    }

    const control = () => {
        switch (type) {
            case 'text':
            case 'email':
                return (
                    <Form.Control type={type}
                                  autoComplete="off"
                                  name={id}
                                  id={id}
                                  pattern={pattern}
                                  onChange={changeHandler}
                                  value={value}
                                  disabled={disabled}
                                  placeholder={placeholder}
                                  required={isRequired}
                                  onFocus={() => setShow(true)}
                                  onBlur={() => setShow(false)}/>
                )

            case 'link':
                return (
                    <div className='d-flex flex-row with-fixed-text align-items-center mb-4'>
                        <Form.Control type={type}
                                      autoComplete="off"
                                      name={id}
                                      id={id}
                                      className={'d-inline-flex text-start ltr'}
                                      pattern={pattern}
                                      onChange={changeHandler}
                                      value={value}
                                      required={isRequired}
                                      onFocus={() => setShow(true)}
                                      onBlur={() => setShow(false)}/>
                        <span className='d-inline-flex px-2 font-13 ltr'>{placeholder}</span>
                    </div>

                )
            case 'password':
                return (
                    <div className='w-100 with-button-input mb-4'>
                        <Form.Control type={showPass ? 'text' : 'password'}
                                      autoComplete="off"
                                      name={id}
                                      id={id}
                                      disabled={disabled}
                                      pattern={pattern}
                                      onChange={changeHandler}
                                      value={value}
                                      placeholder={placeholder}
                                      className={'m-0 px-0 border-0'}
                                      required={isRequired}
                                      onFocus={() => setShow(true)}
                                      onBlur={() => setShow(false)}/>

                        <button type='button' onClick={() => setShowPass(!showPass)}><i
                            className={showPass ? icons.shEyeHidden : icons.shEye}/></button>


                        <Form.Control.Feedback type="invalid" className='position-absolute py-1'>
                            {errorText ? errorText : `لطفا ${title} را وارد کنید .`}
                        </Form.Control.Feedback>
                    </div>

                )
            case 'textarea':
                return (
                    <Form.Control as={type} name={id} id={id}
                                  pattern={pattern}
                                  rows={5}
                                  placeholder={placeholder}
                                  disabled={disabled}
                                  onChange={changeHandler}
                                  value={value}
                                  required={isRequired}
                                  onFocus={() => setShow(true)}
                                  onBlur={() => setShow(false)}/>
                )

            case 'select':
                return (
                    <Form.Control as='select' name={id} id={id}
                                  onChange={changeHandler}
                                  required={isRequired}
                                  value={value}>
                        {
                            Array.isArray(options) ?
                                options.map((item, i) => {
                                    return (
                                        <option key={`${id}-${i}`} value={item.id}>{item.title}</option>
                                    )
                                })
                                : <>
                                    {
                                        Object.keys(options).filter(x => x === '').map((key, i) => {
                                            return (
                                                <option key={`${id}-${i}`} value={key}>{options[key]}</option>
                                            )
                                        })
                                    }
                                    {
                                        Object.keys(options).filter(x => x !== '').map((key, i) => {
                                            return (
                                                <option key={`${id}-${i}`} value={key}>{options[key]}</option>
                                            )
                                        })
                                    }
                                </>
                        }
                    </Form.Control>
                )

            case 'check':
                return (
                    <div className='w-100'>
                        <Form.Check
                            id={id}
                            name={id}
                            checked={value}
                            label={placeholder}
                            onChange={changeHandler}/>
                    </div>
                )


            case 'radio':
                return (
                    <div className='w-100'>
                        {
                            Object.keys(options).map((key, i) => {
                                return (
                                    <Form.Check custom inline
                                                type='radio'
                                                name={id}
                                                id={`${id}-${i}`}
                                                key={`${id}-${i}`}
                                                value={key}
                                                label={options[key]}
                                                checked={key === value}
                                                onChange={changeHandler}/>
                                )
                            })
                        }
                    </div>
                )

            case 'image':
                return (<SingleFileUploaderZone mode={pattern ? pattern : "user"} image={value}
                                                setFile={(file) => onChange(id, file)}/>);

            case 'file':
                return (<SingleUploaderZone file={value} setFile={(images) => onChange(id, images)}/>)

        }
    }

    return (
        <div className={`${className}`}>
            {
                title ? <Form.Label className='d-block' htmlFor={id}>
                    {title} :
                    {
                        counter ? <span className='font-13 mt-1'>{counter} / {value?.length || 0}</span> : null
                    }
                </Form.Label> : null
            }
            {control()}

            <Form.Control.Feedback type="invalid">
                {errorText ? errorText : `لطفا ${title} را وارد کنید .`}
            </Form.Control.Feedback>
            {showString && value && value !== '0' ?
                <span
                    className={`d-block my-1 px-3 py-2 bg-warning rounded-pill font-12 mb-2`}>{numberToString(value.toString().replace(/,/g, ''))} تومان</span> : null}
            {
                sample ? <span className="example">{sample}</span> : null
            }
            {
                help && show ?
                    <span className="control-info d-block bg-warning" dangerouslySetInnerHTML={{__html: help}}/> : null
            }
        </div>
    );
}


CustomControl.propTypes = {
    id: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.any,
    title: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
    pattern: PropTypes.string,
    isRequired: PropTypes.bool,
    sample: PropTypes.string,
    help: PropTypes.string,
    errorText: PropTypes.string,
    counter: PropTypes.number,
    options: PropTypes.any,
    numberOnly: PropTypes.bool,
    showString: PropTypes.bool
}

export default CustomControl;
