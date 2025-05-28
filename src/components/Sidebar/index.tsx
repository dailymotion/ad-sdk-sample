import type { JSX } from "react";
import './index.css';
import Tabs from "./Tabs";
import Menu from "./Menu/index.tsx";
const Sidebar = (): JSX.Element => {
    return (
        <div className="sidebar">
            <Tabs />
            <Menu />
        </div>
    );
};

export default Sidebar;
