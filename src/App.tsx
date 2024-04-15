import { Routes, Route } from "react-router-dom";
import { AppShell, ScrollArea } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from "@mantine/notifications";
import "@mantine/core/styles.css";
import '@mantine/notifications/styles.css';
import '@mantine/spotlight/styles.css';
import '@mantine/core/styles.layer.css';

import { ContextMenuProvider } from 'mantine-contextmenu';
import "mantine-contextmenu/styles.css";
import 'mantine-contextmenu/styles.layer.css';
import '@/styles/layers.css';

import UserLocalSettingsContextProvider from "@/contexts/UserLocalSettingsContext";
import BackendClientContextProvider from "@/contexts/BackendClientContext";
import CollectionsContextProvider from "@/contexts/CollectionsContext";
import ItemsContextProvider from "@/contexts/ItemsContext";

import Header from "@/components/header/Header";
import LandingPage from "@/pages/LandingPage";
import Help from "@/pages/Help";
import MainView from "@/pages/MainView";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Request from "@/pages/Request";
import Profile from "@/pages/Profile";

import "@/styles/main.scss";
import InfoModal from "@/components/modals/InfoModal";
import ItemCreateModal from "./components/modals/ItemCreateModal";
import SpotlightSearch from "./components/SpotlightSearch";
import { RequestPageType } from "./types";
import { useHotkeys } from "@mantine/hooks";
import { openSpotlight } from "@mantine/spotlight";
import Terms from "./pages/Terms";

function App() {

    useHotkeys(
        [
            ["mod+K", openSpotlight, { preventDefault: true }],
            ["mod+P", openSpotlight, { preventDefault: true }],
        ],
        [] // Does not ignore; will work in `<input/>` and `<textarea/>`.
    );

    return (
        <AppShell
            header={{ height: 45 }}
            padding="none"
        >
            <UserLocalSettingsContextProvider>

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

                                    <ScrollArea.Autosize
                                        // type="always"
                                        offsetScrollbars
                                        h="100vh"
                                        scrollbarSize={7}
                                    >

                                        <Notifications
                                            limit={5}
                                            position="bottom-center"
                                            autoClose={1000}
                                        />

                                        <AppShell.Header>
                                            <Header />
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
                                                <Route path="/demo-login" element={<Login isDemoMode={true} />} />
                                                <Route path="/register" element={<Register />} />
                                                <Route path="/reset" element={
                                                    <Request pageType={RequestPageType.PASSWORD_CHANGE} />
                                                } />
                                                <Route path="/verify" element={
                                                    <Request pageType={RequestPageType.EMAIL_VERIFY} />
                                                } />
                                                <Route path="/terms" element={<Terms />} />
                                            </Routes>
                                            <SpotlightSearch />

                                        </AppShell.Main>
                                    </ScrollArea.Autosize>

                                </ContextMenuProvider>
                            </ModalsProvider>
                        </ItemsContextProvider>
                    </CollectionsContextProvider>
                </BackendClientContextProvider>

            </UserLocalSettingsContextProvider>

        </AppShell>
    )
}

export default App;