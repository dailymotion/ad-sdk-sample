import type {JSX} from "react";
import {Logo} from "./Logo.tsx";
import './index.css';

const Header: () => JSX.Element = () => {
    return (
        <header role="banner" className="header">
            <Logo/>
            <h1 className="title">AdSDKSample</h1>
        </header>
    )
}

export default Header