import React, { useEffect, useRef } from 'react';
import Plyr from 'plyr';

const VideoPlayer = ({ videoUrl }) => {
    const playerRef = useRef(null);
    useEffect(() => {
        // Initialize Plyr player when the component mounts
        // playerRef.current = new Plyr('#video-player');

        return () => {
            // Clean up Plyr player when the component unmounts
            playerRef.current?.destroy();
        };
    }, []);

    return (
        <div>
            <video id="video-player" controls>
                <source src={videoUrl} type="video/mp4" /> {/* Same video URL for compatibility */}
            </video>
        </div>
    );
};

export default VideoPlayer;