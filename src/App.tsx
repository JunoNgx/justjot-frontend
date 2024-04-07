import { Routes, Route } from "react-router-dom";
import { AppShell } from '@mantine/core';
import { ContextMenuProvider } from 'mantine-contextmenu';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from "@mantine/notifications";

import ThemeModeContextProvider from "@/contexts/ThemeModeContext";
import BackendClientContextProvider from "@/contexts/BackendClientContext";
import CollectionsContextProvider from "@/contexts/CollectionsContext";
import CurrentCollectionContextProvider from "@/contexts/CurrentCollectionContext";
import ItemsContextProvider from "@/contexts/ItemsContext";

import Header from "@/components/header/Header";
import LandingPage from "@/pages/LandingPage";
import Help from "@/pages/Help";
import MainView from "@/pages/MainView";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Reset from "@/pages/Reset";

import "@mantine/core/styles.css";
import '@mantine/notifications/styles.css';
import '@mantine/spotlight/styles.css';
import "mantine-contextmenu/styles.css";

import '@mantine/core/styles.layer.css';
import 'mantine-contextmenu/styles.layer.css';
import '@/styles/layers.css';

import "@/styles/main.scss";
import InfoModal from "@/components/modals/InfoModal";
import ItemCreateModal from "./components/modals/ItemCreateModal";
import Profile from "@/pages/Profile";

function App() {

    return <AppShell
        header={{ height: 45}}
        padding="none"
    >
        <ThemeModeContextProvider>

            <BackendClientContextProvider>
                <CollectionsContextProvider>
                    <CurrentCollectionContextProvider>
                        <ItemsContextProvider>

                            <ModalsProvider
                                modals={{
                                    infoModal: InfoModal,
                                    itemCreateModal: ItemCreateModal
                                }}
                            >
                                <ContextMenuProvider>

                                    <Notifications className="notifications-container"
                                        limit={5}
                                        position="bottom-center"
                                        autoClose={1000}
                                    />

                                    <AppShell.Header className="appshell-header">
                                        <Header/>
                                    </AppShell.Header>

                                    <AppShell.Main className="appshell-main">
                                        <Routes>
                                            <Route path="/" element={<LandingPage />} />
                                            <Route path="/help" element={<Help />} />
                                            <Route path="/:username">
                                                <Route index element={<MainView />} />
                                                <Route path=":collectionSlug" element={<MainView />} />
                                            </Route>
                                            <Route path="/profile" element={<Profile />} />
                                            <Route path="/login" element={<Login />} />
                                            <Route path="/register" element={<Register />} />
                                            <Route path="/reset" element={<Reset />} />
                                        </Routes>
                                    </AppShell.Main>

                                </ContextMenuProvider>
                            </ModalsProvider>

                        </ItemsContextProvider>
                    </CurrentCollectionContextProvider>
                </CollectionsContextProvider>
            </BackendClientContextProvider>

        </ThemeModeContextProvider>
    </AppShell>
}

export default App;