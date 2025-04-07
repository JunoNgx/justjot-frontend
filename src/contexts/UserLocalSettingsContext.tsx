import { createContext, ReactNode, useEffect } from "react";

import { ComputedThemeMode, ThemeMode } from "@/types";
import { useComputedColorScheme, useMantineColorScheme } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";

import { justJotTheme } from '@/theme.ts';

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

    const isComputedLightMode = useComputedColorScheme(
        ComputedThemeMode.LIGHT, { getInitialValueInEffect: true }
    ) === ComputedThemeMode.LIGHT;

    useEffect(() => {
        setMantineColorScheme(themeMode);
    }, [themeMode]);

    useEffect(() => {
        const themeColourMeta = document
            .querySelector("meta[name='theme-color']") as HTMLMetaElement;

        if (!themeColourMeta) return;

        const themeColorValue = isComputedLightMode
            ? justJotTheme.other.colOffWhite
            : justJotTheme.other.colOffBlack;
        themeColourMeta.setAttribute("content", themeColorValue);
    }, [isComputedLightMode]);

    return <UserLocalSettingsContext value={{
        themeMode,
        setThemeMode,
        isFaviconEnabled,
        setIsFaviconEnabled,
    }}>
        {children}
    </UserLocalSettingsContext>
}
