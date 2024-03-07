// import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import { AppShell, Center } from '@mantine/core';

import Header from "./components/Header";

import LandingPage from "./pages/LandingPage";
import Help from "./pages/Help";
import GroupView from "./pages/GroupView";
import Redirect from "./pages/Redirect";
import Login from "./pages/Login";
import Register from "./pages/Register";

import "./styles/main.scss";

function App() {
    // return <div className="app-container">
    return <AppShell
                header={{ height: 60}}
                padding="xl"
            >
                <AppShell.Header>
                    <Header/>
                </AppShell.Header>

                <AppShell.Main>
                    <Center>
                        <Routes>
                            <Route path="/" element={<LandingPage />} />
                            <Route path="/help" element={<Help />} />
                            <Route path="/:username">
                                <Route index element={<GroupView />} />
                                <Route path=":groupSlug" element={<GroupView />} />
                            </Route>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/*" element={<Redirect />} />
                        </Routes>
                    </Center>
                </AppShell.Main>

        </AppShell>
    // </div>
}

export default App;