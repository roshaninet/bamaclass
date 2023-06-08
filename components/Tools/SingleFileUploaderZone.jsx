import Dropzone from 'react-dropzone'
import PropTypes from "prop-types";
import React from "react";
import styles from '@/scss/modules/uploader.module.scss';
import BaseUploader from "@/lib/Base/BaseUploader";
import icons from "@/scss/modules/icons.module.scss"
import globals from "@/scss/modules/globals.module.scss"

class SingleFileUploaderZone extends BaseUploader {
    constructor(props) {
        super(props);
        this.state.class = this.props.mode === "user" ?  styles.uploadedImg : styles[`uploaded${this.props.mode}`];
        this.state.placeholder = this.props.mode === "user" ?  "/img/placeholder.jpg" : "/img/placeholder1.png";
    }

    render() {
        return (
            <Dropzone accept={this.props.types} maxSize={this.props.maxMB * 1000000} onDropAccepted={this.onAccept}
                      onDropRejected={this.onReject}>
                {({getRootProps, getInputProps}) => (
                    <section className={`${styles.uploaderSection} p-2`}>
                        <div {...getRootProps()}>
                            <input id='images' {...getInputProps()} />
                            <div className='row text-center'>
                                <div className='col-auto my-2 my-md-0 mx-auto'>
                                    {
                                        this.state.file && this.state.file.hasOwnProperty('url') ?
                                            <img className={`${this.state.class} img-thumbnail`}
                                                 src={this.state.file.url} alt={"تصویر"}/>
                                            : this.props.image ?
                                                <img className={`${this.state.class} img-thumbnail`}
                                                     src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${this.props.image}`}
                                                     alt={"تصویر"}/>
                                                : <img className={`${this.state.class} img-thumbnail`}
                                                       src={this.state.placeholder} alt={"تصویر"}/>
                                    }
                                </div>
                                <div className='col justify-content-around d-flex flex-column'>
                                    <div className='w-100'>
                                        <span className={`btn bg-primary ${globals.btnIcon}`}>
                                            <i className={icons.shAdd}/>
                                            <span className='pe-2'>افزودن تصویر</span>
                                        </span>
                                    </div>
                                    <div className='w-100 my-2'>
                                        یا
                                    </div>
                                    <div className='w-100'>
                                        <span>تصویر را اینجا بکشید</span>
                                        <i className='sh-gallery me-2'/>
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

SingleFileUploaderZone.defaultProps = {
    maxMB: 10,
    types: {
        "image/*": [".jpeg", ".png", ".webp", ".jpg"]
    }
}

SingleFileUploaderZone.propTypes = {
    image: PropTypes.any,
    setFile: PropTypes.func.isRequired,
    maxMB: PropTypes.number.isRequired,
    types: PropTypes.any.isRequired,
}

export default SingleFileUploaderZone;
