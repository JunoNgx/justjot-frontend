// import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";

import LandingPage from "./pages/LandingPage";
import Help from "./pages/Help";
import ItemList from "./pages/ItemList";
import Redirect from "./pages/Redirect";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
    return <div>
        <Header/>
        <Routes>
            <Route path="/" element={<LandingPage />}/>
            <Route path="/help" element={<Help />}/>
            <Route path="/:username">
                <Route index element={<ItemList/>}/>
                <Route path=":groupSlug" element={<ItemList />}/>
            </Route>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/*" element={<Redirect />}/>
        </Routes>
    </div>
}

export default App;