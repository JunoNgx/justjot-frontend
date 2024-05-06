import HeaderLeftSide from "./HeaderLeftSide";
import HeaderRightSide from "./HeaderRightSide";
import "./header.scss";

function Header() {
    return <div className="header">
        <div className="header__flex-wrapper">
            <HeaderLeftSide/>
            <HeaderRightSide/>
        </div>
    </div>
}

export default Header;