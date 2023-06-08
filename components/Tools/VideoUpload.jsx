import styles from "@/scss/modules/uploader.module.scss";

const VideoUpload = ({process, file, setFile}) => {

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFile(file);
    };


    return (
        <>
            <input type="file" id="video-file" className='d-none' accept="video/*" onChange={handleFileChange}/>
            <label htmlFor="video-file"
                   className='border w-100 bg-white rounded-pill px-3 py-2 position-relative overflow-hidden'>
                <div className='position-relative'>
                    {
                        file ?
                            <span
                                className='font-13'>فایل انتخاب شده: {file.name} {process ? ` (${process}%) ` : ''}</span> :
                            <span className='font-13'>انتخاب فایل ...</span>
                    }
                </div>
                <div className={`progress bg-primary bg-opacity-25 position-absolute ${styles.uploadingProgress}`}
                     style={{width: `${process}%`}}/>
            </label>
        </>

    );
};

export default VideoUpload;