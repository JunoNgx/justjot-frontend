import HeaderLeftSide from "./HeaderLeftSide";
import HeaderRightSide from "./HeaderRightSide";
import "./Header.scss";

function Header() {
    return <div className="header">
        <div className="Header__FlexWrapper">
            <HeaderLeftSide/>
            <HeaderRightSide/>
        </div>
    </div>
}

export default Header;