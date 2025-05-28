import type { JSX } from "react";
import { useEffect, useRef, useState } from "react";
import './index.css';
import { NavLink, useLocation } from "react-router-dom";

const Tabs = (): JSX.Element => {
    const [activeIndex, setActiveIndex] = useState(0);
    const tabRefs = useRef<Array<HTMLAnchorElement | null>>([]);
    const indicatorRef = useRef<HTMLDivElement | null>(null);
    const location = useLocation();

    const tabLabels = ["Classic", "Canal +"];
    const tabRoutes = ["/", "/canal-plus"];

    useEffect(() => {
        const index = tabRoutes.findIndex(route => location.pathname === route);
        if (index !== -1) {
            setActiveIndex(index);
        }
    }, [location.pathname]);

    // Animate indicator after DOM update
    useEffect(() => {
        const animate = () => {
            const activeTab = tabRefs.current[activeIndex];
            const indicator = indicatorRef.current;

            if (activeTab && indicator) {
                const tabRect = activeTab.getBoundingClientRect();
                const containerRect = activeTab.parentElement!.getBoundingClientRect();

                const offsetLeft = tabRect.left - containerRect.left;
                const width = tabRect.width;

                indicator.style.width = `${width}px`;
                indicator.style.transform = `translateX(${offsetLeft}px)`;
            }
        };

        requestAnimationFrame(animate);
    }, [activeIndex, location.pathname]);

    return (
        <div role="tablist" className="tabs-wrapper">
            {tabLabels.map((label, index) => (
                <NavLink
                    key={label}
                    to={tabRoutes[index]}
                    role="tab"
                    className={`tab ${activeIndex === index ? "active" : ""}`}
                    aria-selected={activeIndex === index}
                    ref={(el) => {
                        tabRefs.current[index] = el;
                    }}
                >
                    {label}
                </NavLink>
            ))}
            <div className="tab-indicator" ref={indicatorRef}></div>
        </div>
    );
};

export default Tabs;
