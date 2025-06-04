import type {JSX} from "react";
import './index.css';
import {ExternalLinkIcon} from "./ExternalLink.tsx";

export const VersionTag: () => JSX.Element = () => {
    const version = import.meta.env.VITE_AD_SDK_WEB_PKG_VERSION;

    return (
        <a
           href="https://www.npmjs.com/package/@dailymotion/ad-sdk-web"
           className="version-tag"
           target="_blank"
           rel="noopener noreferrer"
           aria-label={`Ad SDK Version: ${version} (opens in a new tab)`}
        >
            Ad SDK Version: {version}
            <ExternalLinkIcon/>
        </a>);
};