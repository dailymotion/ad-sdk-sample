import type { JSX } from "react";
import './index.css';
import {useMenu} from "../../menuContext.tsx";

const Menu = (): JSX.Element => {
    const { menu, setMenu } = useMenu();

    return (
        <div className="menu">
            <button
                className={`menu-button ${menu === "stream" ? "active" : ""}`}
                onClick={() => setMenu("stream")}
            >
                Stream
            </button>
            <button
                className={`menu-button ${menu === "dvr" ? "active" : ""}`}
                onClick={() => setMenu("dvr")}
            >
                DVR
            </button>
        </div>
    );
};

export default Menu;
