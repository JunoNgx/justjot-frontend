import { useContext } from "react";
import { BackendClientContext } from "@/contexts/BackendClientContext";
import HeaderThemeModeGroup from "./HeaderThemeModeGroup";
import HeaderLoginRegisterBox from "./HeaderLoginRegisterBox";
import HeaderUser from "./HeaderUser";

export default function HeaderLeftSide() {
    const { isLoggedIn } = useContext(BackendClientContext);

    return <div className="Header__RightSide">
        <HeaderThemeModeGroup/>
        <div className="Header__UserCorner">
            {isLoggedIn
                ? <HeaderUser/>
                : <HeaderLoginRegisterBox/>
            }
        </div>
    </div>
}