import { useContext, useEffect } from "react"
import { BackendClientContext } from "@/contexts/BackendClientContext";
import { NavLink, useNavigate } from "react-router-dom";
import { JustJotIcon } from "@/components/misc/JustJotIcon";
import { APP_NAME } from "@/utils/constants";

import "./LandingPage.scss";

export default function LandingPage() {
    const { pbClient, isLoggedIn } = useContext(BackendClientContext);

    useEffect(() => {
        if (isLoggedIn) {
            navigate(
                `/${pbClient.authStore.model?.username}`,
                { replace: true }
            );
            return;
        }

        document.title = `${APP_NAME} — A minimalist keyboard-first note-taking web application tailored for fast operations`;
    }, []);

    const navigate = useNavigate();

    return <div className="LandingPage">
        <section className="LandingPage__Section">
            <div className="LandingPage__Banner">
                <JustJotIcon size={72} stroke={"0.1"}/>
                <div>
                    <h2 className="LandingPage__DefText">jot</h2>
                    <p className="LandingPage__DefText LandingPage__DefText--IsItalic">/dʒɒt/</p>
                    <p className="LandingPage__DefText">(verb)</p>
                    <p className="LandingPage__DefText">write (something) quickly</p>
                </div>
            </div>
        </section>

        <section className="LandingPage__Section">
            <h1>JustJot</h1>
            <p>A minimalist keyboard-first note-taking Progressive Web App, tailored for fast operations.</p>
        </section>

        <section className="LandingPage__Section">
            <div className="LandingPage__DemoBox">
                <p className="LandingPage__DemoText">Just want to take a look?</p>
                <p  className="LandingPage__DemoText">Account-free live demo available</p>
                <div className="LandingPage__DemoBtnContainer">
                    <NavLink className="LandingPage__DemoCtaBtn"
                        to="/demo-login"
                    >
                        Try now
                    </NavLink>
                </div>
            </div>
        </section>

        <section className="LandingPage__Section">
            <h2>Keyboard-first</h2>
            <p>JustJot prioritises keyboard interactions; most actions can be performed solely on a keyboard. While fully operable with pointer-based devices (mouse or touchscreen), users are recommended to spend time on learning to perform operations the optimal way.</p>

            <p>Due to the unconventional approach, consulting <NavLink to="/help">the manual</NavLink> is highly recommended for new users.</p>
        </section>

        <section className="LandingPage__Section">
            <h2>Your omnipotent notebook</h2>
            <p className="LandingPage__UlPredecessor">
                Outside of handling plain-text notes, this app is also capable of:
            </p>
            <ul>
                <li>Storing bookmarks</li>
                <li>Managing todo items</li>
                <li>Displaying hex colour code preview</li>
            </ul>
        </section>
        
        <section className="LandingPage__Section">
            <h2>Average FOSS software</h2>
            <p>JustJot was made with personal use and personal preferences first and foremost. It is as barebone and small as it can and should be. It has minimal development roadmap, no monetisation, no advertisement, no tracking, and is fully open-source. Technical support is limited and not guaranteed (I'll try as much as I can).</p>
        </section>

        <section className="LandingPage__Section">
            <h2>Get started</h2>
            <p><NavLink to="/register">Register</NavLink> a new account or <NavLink to="/login">login</NavLink> to your existing one.</p>
            <p>Also, you don't need to sign up just to see what this is all about. There is a <NavLink to="/demo-login">live demo</NavLink> using a test account, obligation-free.</p>
            <p>While we are at that, drop by to see <NavLink to="/terms">things you should know about</NavLink> and <NavLink to="/help">the manual</NavLink> before using JustJot.</p>
        </section>

        <section className="LandingPage__Section">
            <h2>Authors</h2>
            <p>JustJot is developed by <a href="https://www.junongx.com/" target='_blank' rel='noopener noreferrer'>Juno Nguyen</a> with curiosity, compulsion, and tons of design input from <a href="https://caseykwokdinata.webflow.io/" target='_blank' rel='noopener noreferrer'>Casey Kwokdinata</a>.</p>
        </section>
    </div>
}
