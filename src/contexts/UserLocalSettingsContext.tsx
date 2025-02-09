import { createContext, ReactNode, useEffect } from "react";

import { ThemeMode } from "@/types";
import { useMantineColorScheme } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";

type UserLocalSettingsContextType = {
    themeMode: ThemeMode,
    setThemeMode: React.Dispatch<React.SetStateAction<ThemeMode>>,
    isFaviconEnabled: boolean,
    setIsFaviconEnabled: React.Dispatch<React.SetStateAction<boolean>>,
}

export const UserLocalSettingsContext = createContext<UserLocalSettingsContextType>({} as UserLocalSettingsContextType);

export default function UserLocalSettingsContextProvider({children}: {children: ReactNode}) {
    const [themeMode, setThemeMode] = useLocalStorage<ThemeMode>({
        key: "color-scheme",
        defaultValue: ThemeMode.AUTO,
    });
    const [isFaviconEnabled, setIsFaviconEnabled] = useLocalStorage<boolean>({
        key: "isFaviconEnabled",
        defaultValue: true,
    });

    const {
        setColorScheme: setMantineColorScheme,
    } = useMantineColorScheme();

    useEffect(() => {
        setMantineColorScheme(themeMode);
    }, [themeMode]);

    return <UserLocalSettingsContext value={{
        themeMode,
        setThemeMode,
        isFaviconEnabled,
        setIsFaviconEnabled,
    }}>
        {children}
    </UserLocalSettingsContext>
}
