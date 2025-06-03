import type { JSX } from "react";
import './index.css';
import { AdSdkWeb } from '@dailymotion/ad-sdk-web';
import type { AppState } from '@dailymotion/ad-sdk-web';
import { useEffect, useRef } from "react";

const VideoTag: () => JSX.Element = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const startAd = async () => {
            const container = containerRef.current;
            const videoTag = videoRef.current;
            if (!container || !videoTag) return;

            videoTag.removeEventListener('play', startAd);
            videoTag.pause();

            const adSDK = new AdSdkWeb();
            await adSDK.initialize(container);

            let adPosition: string | null = null;

            const onAdStart = () => {
                adPosition = adSDK.getAdDetails().position;
                videoTag.pause();
                console.log(`Ad Started at position: ${adPosition}`);
            };

            const onAdEnd = () => {
                console.log('Ad Ended');
                if (adSDK.getAdDetails().position !== 'postroll') {
                    videoTag.play();
                }
            };

            adSDK.on(adSDK.Events.AD_START, onAdStart);
            adSDK.on(adSDK.Events.AD_END, onAdEnd);

            const appState: AppState = {
                consent: {
                    ccpaConsent: '',
                    tcfConsent: '',
                    isEnabledForTcf: false,
                    tcf2HasConsentForGoogle: false,
                    tcf2HasConsentForDailymotion: false,
                    isGdprApplicable: false,
                },
                video: {
                    id: 'x123',
                    isAutoplay: false,
                    type: 'STREAM',
                    isCurrentTimeDVR: false,
                    isSeekable: false,
                    viewId: '',
                    duration: 62,
                },
                environment: {
                    appName: '',
                    locale: '',
                    topDomain: '',
                    embedder: '',
                    clientType: '',
                    deviceId: '',
                    trafficSegment: 0,
                    v1st: '',
                },
                player: {
                    videoTag: videoTag,
                    isPlayerControlsEnabled: false,
                    is3rdPartyCookiesAvailable: false,
                    playedVideosCounter: 0,
                },
            }

            await adSDK.loadAds(appState);
        };

        const videoTag = videoRef.current;
        if (videoTag) {
            videoTag.addEventListener('play', startAd);
            return () => videoTag.removeEventListener('play', startAd);
        }
    }, []);

    return (
        <div className="videoWrapper">
            <div className="videoPlayerContainer" ref={containerRef}>
                <video
                    id="videoPlayer"
                    className="videoPlayer"
                    controls
                    muted
                    ref={videoRef}
                >
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
