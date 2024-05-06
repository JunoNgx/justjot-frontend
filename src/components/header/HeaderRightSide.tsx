import { useContext } from "react";
import { BackendClientContext } from "@/contexts/BackendClientContext";
import HeaderThemeModeGroup from "./HeaderThemeModeGroup";
import HeaderLoginRegisterBox from "./HeaderLoginRegisterBox";
import HeaderUser from "./HeaderUser";

export default function HeaderLeftSide() {
    const { isLoggedIn } = useContext(BackendClientContext);

    return <div className="header__RightSide">
        <HeaderThemeModeGroup/>
        <div className="header__UserCorner">
            {isLoggedIn
                ? <HeaderUser/>
                : <HeaderLoginRegisterBox/>
            }
        </div>
    </div>
}