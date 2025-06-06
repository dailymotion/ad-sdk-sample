import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";

type MenuType = "stream" | "dvr";

interface MenuContextType {
    menu: MenuType;
    setMenu: (view: MenuType) => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
    const [menu, setMenu] = useState<MenuType>("stream");

    return (
        <MenuContext.Provider value={{ menu, setMenu }}>
            {children}
        </MenuContext.Provider>
    );
};

export const useMenu = (): MenuContextType => {
    const context = useContext(MenuContext);
    if (!context) {
        throw new Error("useMenu must be used within a MenuProvider.");
    }
    return context;
};
