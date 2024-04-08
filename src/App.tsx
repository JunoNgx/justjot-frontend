import { Routes, Route } from "react-router-dom";
import { AppShell, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from "@mantine/notifications";
import "@mantine/core/styles.css";
import '@mantine/notifications/styles.css';
import '@mantine/spotlight/styles.css';
import '@mantine/core/styles.layer.css';

import { ContextMenuProvider } from 'mantine-contextmenu';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import "mantine-contextmenu/styles.css";
import 'mantine-contextmenu/styles.layer.css';
import '@/styles/layers.css';
import 'overlayscrollbars/styles/overlayscrollbars.css';

import ThemeModeContextProvider from "@/contexts/ThemeModeContext";
import BackendClientContextProvider from "@/contexts/BackendClientContext";
import CollectionsContextProvider from "@/contexts/CollectionsContext";
import ItemsContextProvider from "@/contexts/ItemsContext";

import Header from "@/components/header/Header";
import LandingPage from "@/pages/LandingPage";
import Help from "@/pages/Help";
import MainView from "@/pages/MainView";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Reset from "@/pages/Reset";
import Profile from "@/pages/Profile";

import "@/styles/main.scss";
import InfoModal from "@/components/modals/InfoModal";
import ItemCreateModal from "./components/modals/ItemCreateModal";
import SpotlightSearch from "./components/SpotlightSearch";
import { ComputedThemeMode } from "./types";
import { useHotkeys } from "@mantine/hooks";
import { openSpotlight } from "@mantine/spotlight";

function App() {

    const { colorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme(colorScheme as ComputedThemeMode);
    const scrollbarThemeClass = computedColorScheme === ComputedThemeMode.LIGHT
        ? "os-theme-dark"
        : "os-theme-light";

    useHotkeys([
        ["mod+K", openSpotlight, {preventDefault: true}],
        ["mod+P", openSpotlight, {preventDefault: true}],
    ], []);

    return (
        <AppShell
            header={{ height: 45}}
            padding="none"
        >
            <ThemeModeContextProvider>

                <BackendClientContextProvider>
                    <CollectionsContextProvider>
                        <ItemsContextProvider>
                            <ModalsProvider
                                modals={{
                                    infoModal: InfoModal,
                                    itemCreateModal: ItemCreateModal
                                }}
                            >
                                <ContextMenuProvider>

                                    <OverlayScrollbarsComponent
                                        className="overlayScrollbar"
                                        options={{
                                            scrollbars: {
                                                theme: scrollbarThemeClass,
                                                visibility: 'auto',
                                                autoHide: 'scroll',
                                                autoHideDelay: 1000,
                                            },
                                        }}
                                        defer
                                    >

                                        <Notifications
                                            limit={5}
                                            position="bottom-center"
                                            autoClose={1000}
                                        />

                                        <AppShell.Header>
                                            <Header/>
                                        </AppShell.Header>

                                        <AppShell.Main>
                                            <Routes>
                                                <Route path="/" element={<LandingPage />} />
                                                <Route path="/help" element={<Help />} />
                                                <Route path="/:username">
                                                    <Route index element={<MainView />} />
                                                    <Route path=":collectionSlug" element={<MainView />} />
                                                </Route>
                                                <Route path="/profile" element={<Profile />} />
                                                <Route path="/login" element={<Login />} />
                                                <Route path="/demo-login" element={<Login isDemoMode={true}/>} />
                                                <Route path="/register" element={<Register />} />
                                                <Route path="/reset" element={<Reset />} />
                                            </Routes>
                                            <SpotlightSearch/>

                                        </AppShell.Main>
                                    </OverlayScrollbarsComponent>

                                </ContextMenuProvider>
                            </ModalsProvider>
                        </ItemsContextProvider>
                    </CollectionsContextProvider>
                </BackendClientContextProvider>

            </ThemeModeContextProvider>

        </AppShell>
    )
}

export default App;