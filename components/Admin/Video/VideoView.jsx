import dynamic from "next/dynamic";
const ParlikePlayer = dynamic(() => import('@/components/Player/ParlikePlayer'), {
    ssr: false
});
const VideoView = ({videoPath}) => {
    return (
        <div className='w-100 h-100'>
            {videoPath ? <ParlikePlayer src={videoPath}/> : null}
        </div>
    )
}

export default VideoView;