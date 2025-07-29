import type { JSX } from "react";
import './index.css';
import { AdSdkWeb } from '@dailymotion/ad-sdk-web';
import type { AppState, DevelopmentOptions } from '@dailymotion/ad-sdk-web';
import { useEffect, useRef } from "react";

const VideoTag: () => JSX.Element = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const adSDK = new AdSdkWeb()
    let adSdkInitialized = false

    useEffect(() => {
        const initAdSdk = async (): Promise<void> => {
            const container = containerRef.current;
            const videoTag = videoRef.current;

            if(!container || !videoTag || adSdkInitialized ) { return }

            adSdkInitialized = true
            await adSDK.initialize(container)

            videoTag.addEventListener('play', loadAdsSequence)
        }

        const loadAdsSequence = async (): Promise<void> => {
            const container = containerRef.current;
            const videoTag = videoRef.current;

            if (!container || !videoTag) return;

            videoTag.removeEventListener('play', loadAdsSequence)
            videoTag.pause()

            let adPosition: string | null = null

            const onContentPauseRequested = (): void => {
                console.log('Content pause requested')
                videoTag.pause()
            }

            const onContentResumeRequested = (): void => {
                console.log('Content resume requested')
                if (adSDK.getAdDetails().position !== 'postroll') {
                    videoTag.play()
                }
            }

            const onAdLoad = () => {
                console.log('Ad loaded')
            }

            const onAdStart = (): void => {
                adPosition = adSDK.getAdDetails().position
                console.log(`Ad Started at position: ${adPosition}`)
            }

            const onAdEnd = (): void => {
                console.log('Ad ended')
            }

            const onAdPlay = (): void => {
                console.log('Ad is playing')
            }

            const onAdPause = (): void => {
                console.log('Ad is paused')
            }

            const onAdBreakEnd = (): void => {
                console.log('Ad break ended')
            }

            const onAdBreakStart = (): void => {
                console.log('Ad break started')
            }

            adSDK.on(adSDK.Events.CONTENT_PAUSE_REQUESTED, onContentPauseRequested)
            adSDK.on(adSDK.Events.CONTENT_RESUME_REQUESTED, onContentResumeRequested)

            adSDK.on(adSDK.Events.AD_LOAD, onAdLoad)
            adSDK.on(adSDK.Events.AD_START, onAdStart)
            adSDK.on(adSDK.Events.AD_END, onAdEnd)
            adSDK.on(adSDK.Events.AD_BREAK_END, onAdBreakEnd)
            adSDK.on(adSDK.Events.AD_BREAK_START, onAdBreakStart)
            adSDK.on(adSDK.Events.AD_PLAY, onAdPlay)
            adSDK.on(adSDK.Events.AD_PAUSE, onAdPause)

            const appState: AppState = {
                consent: {
                    ccpaConsent: '',
                    tcfConsent: '',
                    tcf2HasConsentForGoogle: false,
                    tcf2HasConsentForDailymotion: false,
                    isGdprApplicable: false,
                    gppConsentStringFromPlayer: '',
                    gppApplicableSectionsFromPlayer: [],
                },
                video: {
                    id: 'x123',
                    isAutoplay: false,
                    type: 'STREAM',
                    isCurrentTimeDVR: false,
                    isSeekable: false,
                    viewId: '',
                    duration: 62,
                    publisherId: 'publisher-id',
                    publisherType: 'publisher-type',
                    publisherReference: 'publisher-reference',
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
                    is3rdPartyCookiesAvailable: false,
                },
                player: {
                    videoTag: videoTag,
                    isPlayerControlsEnabled: false,
                    playedVideosCounter: 0,
                },
            }

            const developmentOptions: DevelopmentOptions = {
                useFakeAd: true
            }

            await adSDK.loadAdsSequence(appState, developmentOptions)
        }

        initAdSdk()
    }, []);

    return (
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
    )
}

export default VideoTag
