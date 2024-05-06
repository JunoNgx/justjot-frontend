import { NavLink } from "react-router-dom";
import CollectionMenu from "@/components/CollectionMenu";
import { useContext } from "react";
import { BackendClientContext } from "@/contexts/BackendClientContext";
import { JustJotIcon } from "@/components/misc/JustJotIcon";
import useIconProps from "@/hooks/useIconProps";

export default function HeaderLeftSide() {

    const { user } = useContext(BackendClientContext);
    const { logoIconProps } = useIconProps();
    
    return <div className="header__LeftSide">
        <NavLink className="header__LogoNav"
            to={user ? `/${user.username}` : "/"}
            aria-label="Link to home page"
        >
            <JustJotIcon className="header__LogoIcon"
                {...logoIconProps}
            />
        </NavLink>
        <CollectionMenu/>
    </div>
}