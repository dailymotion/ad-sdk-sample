import type { JSX } from "react";
import { useLocation } from "react-router-dom";
import VideoTag from "./VideoTag";
import WorkInProgress from "./WorkInProgress";
import {useMenu} from "../menuContext.tsx";
import './index.css';

const Content = (): JSX.Element => {
    const location = useLocation();
    const { menu } = useMenu();

    const isClassic = location.pathname === "/";
    const isCanalPlus = location.pathname === "/canal-plus";

    if (isClassic) {
        if (menu === "stream") {
            return <VideoTag />;
        } else {
            return <WorkInProgress />;
        }
    }

    if (isCanalPlus) {
        return <WorkInProgress />;
    }

    return <p className="wip-text">Page not found or work in progress</p>;
};

export default Content;
