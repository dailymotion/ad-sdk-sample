import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";
import './index.css';
import {CopyIcon} from "./CopyIcon.tsx";

const htmlCode = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Ad Sdk Web Implementation Example</title>
    <link rel="stylesheet" href="./index.css" />
    <script type="module" src="./index.ts"></script>
  </head>
  <body>
    <div class="videoPlayerContainer">
      <video id="videoPlayer" class="videoPlayer" controls>
        <source src="video-url.mp4" type="video/mp4" />
      </video>
    </div>
  </body>
</html>`;

const cssCode = `.videoPlayerContainer {
    position: relative;
    width: auto;
    height: 100%;
    aspect-ratio: 16/9;
}

.videoPlayer {
    max-width: 50vw;
}`;

const jsCode = `import { AdSdkWeb } from '@dailymotion/ad-sdk-web';

const container = document.querySelector('.videoPlayerContainer');
const videoTag = document.getElementById('videoPlayer');

const adSDK = new AdSdkWeb();

const initAdSdk = async () => {
  await adSDK.initialize(container);

  videoTag.addEventListener('play', startAd);
}
const startAd = async () => {
  videoTag.removeEventListener('play', startAd);
  videoTag.pause();

  let adPosition = null;

  const onAdStart = () => {
    adPosition = adSDK.getAdDetails().position;
    videoTag.pause();
  };

  const onAdEnd = () => {
    console.log('Ad Ended');
    if (adSDK.getAdDetails().position !== 'postroll') {
      videoTag.play();
    }

    adSDK.off(adSDK.Events.AD_START, onAdStart);
    adSDK.off(adSDK.Events.AD_END, onAdEnd);
  };

  adSDK.on(adSDK.Events.AD_START, onAdStart);
  adSDK.on(adSDK.Events.AD_END, onAdEnd);

  const appState = {
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

  await adSDK.loadAdsSequence(appState);
};

initAdSdk();
`;

const Code = () => {
    const [activeTab, setActiveTab] = useState<"html" | "css" | "js">("html");
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText("npm install @dailymotion/ad-sdk-web").then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const renderCode = () => {
        switch (activeTab) {
            case "html":
                return htmlCode;
            case "css":
                return cssCode;
            case "js":
                return jsCode;
        }
    };

    return (
        <div className="codeWrapper">
            <h3 className="subtitle">How to implement our Ad SDK</h3>
            <p className="codeText">
                Install SDK:</p>
            <div className="codeTextWrapper">
                <SyntaxHighlighter
                    language="bash"
                    style={okaidia}
                    wrapLongLines
                >
                    npm install @dailymotion/ad-sdk-web
                </SyntaxHighlighter>
                <button className="copyButton" onClick={copyToClipboard}>
                    <CopyIcon/>
                    {copied ? "Copied!" : "Copy"}
                </button>
            </div>
            <nav className="codeNav">
                {["html", "css", "js"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`codeButton ${activeTab === tab ? "active" : ""}`}
                    >
                        {tab.toUpperCase()}
                    </button>
                ))}
            </nav>
            <SyntaxHighlighter
                language={activeTab === "js" ? "typescript" : activeTab}
                style={okaidia}
                showLineNumbers
                wrapLongLines
                customStyle={{marginTop: "1rem", borderRadius: "5px"}}
            >
                {renderCode()}
            </SyntaxHighlighter>
        </div>
    );
};

export default Code;
