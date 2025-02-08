import { APP_NAME } from "@/utils/constants";

export default function Terms() {

    return <article className="Cardlike Cardlike--LongDoc">
        <title>{`Terms and Conditions — ${APP_NAME}`}</title>

        <h2>Terms and Conditions</h2>
        <p>
            These are not exactly "terms and conditions" per se (I needed your attention nevertheless); more like things you should be aware of and acknowledge before signing up.
        </p>
        <ul className="CardLike__TermList">
            <li className="Cardlike__TermItem">The functionality of this application involves displaying favicon assets from third-party sites, and as a result, third-party cookies. This can be changed in the account settings and is opt-out.</li>
            <li className="Cardlike__TermItem">As of time of writing, JustJot is not a commercial company, but the output of hobbyist project from a momentarily over-enthusiatic software developer.</li>
            <li className="Cardlike__TermItem">JustJot does not collect data more than absolutely necessary to function (such as your email and username, though you are free to anonymise them), serve advertisements, or is monetised in anyway. If you wonder why you do not see any GDPR notice, it is because absolutely nothing is done with your data and no permission is needed.</li>
            <li className="Cardlike__TermItem">For the purpose of maintaining the app, I will occasionally have to look at your data in the database (not unlike a hotel manager looking inside your room to inspect it using a master key), but it will not happen more than necessary.</li>
            <li className="Cardlike__TermItem">Your data is yours. You can choose to be anonymous. Email verification is only for the purpose of minimising potential bad actors. Data deletion requests are prioritised above all else.</li>
            <li className="Cardlike__TermItem">Due to obligations with a full-time job and social duties, among other humanly mortal coils, I am unable to promise timely and thorough technical support, but I would try my best to answer queries within my capability.</li>
            <li className="Cardlike__TermItem">I reserve the right to deny service and access to JustJot for any reason. This is quite difficult to happen; it is here just in case I absolutely have to exercise it.</li>
            <li className="Cardlike__TermItem">I should not have to mention this, but JustJot is far from an ideal service to handle passwords, recovery phrases, crypto wallet mnemonics, classified documents, nuclear launch codes, or any other sensitive data.</li>
            <li className="Cardlike__TermItem">It is okay for you to not use JustJot. In fact, if you are questioning, then you probably should not. There are plenty of more feature-complete and secure note-taking and bookmarking services out there.</li>
            <li className="Cardlike__TermItem">I make nothing from running this (more like losing money, because of the domain cost). It was built because I enjoy making things. I am happy if JustJot is useful to you and would like to hear about it.</li>
            <li className="Cardlike__TermItem">I am too busy to study lawsuits and tell which rights to waive, but considering that this is a passion project that cost nothing from the users, let us hope it would not come to that. If there is any issue or concern, please contact me.</li>
        </ul>
    </article>
}
