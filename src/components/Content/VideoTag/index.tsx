import type {JSX} from "react";
import './index.css';

const VideoTag: () => JSX.Element = () => {
    return (
        <div className="videoWrapper">
            <div className="videoPlayerContainer">
                <video id="videoPlayer" className="videoPlayer" controls muted>
                    <source
                        src="https://statics.dmcdn.net/h/html/media/Dailymotion-Change-ton-feed-2023.mp4"
                        type="video/mp4"
                    />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    )
}

export default VideoTag