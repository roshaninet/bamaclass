import styles from "@/scss/modules/modules/video.module.scss";

const Frame = ({url, className}) => {

    return (
        <div className={`${styles.hIframe} ${className || ''}`}>
            <iframe src={link}
                    allowFullScreen={true} webkitallowfullscreen="true" mozallowfullscreen="true"/>
        </div>
    )
}

Frame.defaultProps = {
    live: false
}

export default Frame;