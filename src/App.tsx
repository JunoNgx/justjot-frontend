import { Routes, Route } from "react-router-dom";
import { AppShell, ScrollArea } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from "@mantine/notifications";

import EventBusContext from "./contexts/EventBusContext";
import UserLocalSettingsContext from "@/contexts/UserLocalSettingsContext";
import BackendClientContext from "@/contexts/BackendClientContext";
import CollectionsContext from "@/contexts/CollectionsContext";
import ItemsContext from "@/contexts/ItemsContext";

import "@mantine/core/styles.css";
import '@mantine/notifications/styles.css';
import '@mantine/spotlight/styles.css';
import '@mantine/core/styles.layer.css';

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
            <EventBusContext>
                <UserLocalSettingsContext>
                    <BackendClientContext>
                        <CollectionsContext>
                            <ItemsContext>
                                <ModalsProvider
                                    modals={{
                                        infoModal: InfoModal,
                                        itemCreateModal: ItemCreateModal
                                    }}
                                >

                                    <ScrollArea
                                        // Mantine currently doesn't havea fade out transition; this looks very ugly
                                        // TODO: submit PR to mantine to fix this
                                        type="scroll"
                                        h="100vh"
                                        scrollbarSize={10}
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
                                    </ScrollArea>

                                </ModalsProvider>
                            </ItemsContext>
                        </CollectionsContext>
                    </BackendClientContext>
                </UserLocalSettingsContext>
            </EventBusContext>
        </AppShell>
    )
}

export default App;