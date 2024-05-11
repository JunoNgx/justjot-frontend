import { Checkbox } from "@mantine/core";
import { useContext } from "react";
import { UserLocalSettingsContext } from "@/contexts/UserLocalSettingsContext";

export default function ProfileFaviconCookies() {

    const { isFaviconEnabled, setIsFaviconEnabled } = useContext(UserLocalSettingsContext);

    return <div className="Profile">
        <h3 className="Profile__Title">
            Favicons and third-party cookies
        </h3>

        <div>
            <p>Checking this setting will enable:</p>
            <ul>
                <li>Display favicon icons for your bookmark items.</li>
                <li>Third-party cookies from these sites.</li>
            </ul>
            <p>These two matters are unforunately not separable at the current time. Cookies are a complicated matter, but you should be informed of the facts.</p>
        </div>

        <Checkbox
            checked={isFaviconEnabled}
            onChange={(event) => setIsFaviconEnabled(event.currentTarget.checked)}
            label="I would like to enable the display of favicons and related third-party cookies for this device"
        />
    </div>
}
