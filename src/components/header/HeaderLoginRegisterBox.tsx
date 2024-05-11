import { NavLink } from "react-router-dom";

export default function HeaderLoginRegisterBox() {
    return <div className="Header__LoginRegisterBox">
        <NavLink to="/login">Login</NavLink>
        <span>/</span>
        <NavLink to="/register">Register</NavLink>
    </div>
}
