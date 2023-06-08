import Dropzone from 'react-dropzone'
import PropTypes from "prop-types";
import React from "react";
import BaseUploader from "@/lib/Base/BaseUploader";
import icons from "@/scss/modules/icons.module.scss"
import globals from "@/scss/modules/globals.module.scss"

class SingleUploaderZone extends BaseUploader {
    constructor(props) {
        super(props);
        if (props.hasOwnProperty('file')) {
            this.state.file = props.file;
        }
    }

    componentDidMount() {
        this.setState({
            file: this.props.file
        })
    }

    render() {
        return (
            <Dropzone accept={this.props.types} maxSize={this.props.maxMB * 1000000} onDropAccepted={this.onAccept}
                      onDropRejected={this.onReject}>
                {({getRootProps, getInputProps}) => (
                    <section
                        className={` ${(this.state.file && this.state.file.hasOwnProperty('url')) || (this.props.file && this.props.file.hasOwnProperty('url')) ? globals.bgOrange : 'bg-darkmode'} border rounded p-1`}>
                        <div {...getRootProps()}>
                            <input id='images' {...getInputProps()} />
                            <div className='row text-center'>

                                <div className='col justify-content-around d-flex flex-column'>
                                    <div className='w-100'>
                                        {
                                            (this.state.file && this.state.file.hasOwnProperty('url')) || (this.props.file && this.props.file.hasOwnProperty('url')) ?
                                                <span className={`btn btn-sm ${globals.btnIcon}`}>
                                            <i className={icons.shFlip}/>
                                            <span className='px-2'>تغییر فایل</span>
                                        </span> : <span className={`btn btn-sm ${globals.btnIcon}`}>
                                            <i className={icons.shAdd}/>
                                            <span
                                                className='px-2'>انتخاب فایل (حداکثر {this.props.maxMB} مگابایت)</span>
                                        </span>
                                        }
                                    </div>
                                </div>


                            </div>
                        </div>

                    </section>
                )}
            </Dropzone>
        )
    }

}

SingleUploaderZone.defaultProps = {
    maxMB: 20,
    types: {
        "image/*": [".jpeg", ".png", ".webp", ".jpg"]
    }
}

SingleUploaderZone.propTypes = {
    file: PropTypes.any,
    setFile: PropTypes.func.isRequired,
    maxMB: PropTypes.number.isRequired,
    types: PropTypes.any.isRequired,
}

export default SingleUploaderZone;
