import { Anchor, Card, Text, Title } from "@mantine/core";

export default function Terms() {

    return <Card className="cardlike cardlike--long-doc"
        p="md"
        component="article"
    >
        <Card.Section component="section">
            <Title order={2}>Terms and Conditions</Title>
            <Text>
                These are not exactly "terms and conditions" per se (I needed your attention nevertheless); more like things you should be aware of and acknowledge before signing up.
            </Text>
            <ul className="cardlike__terms-ul">
                <li className="cardlike__terms-li">As of time of writing, JustJot is not a commercial company, but the output of hobbyist project from a momentarily over-enthusiatic software developer.</li>
                <li className="cardlike__terms-li">JustJot does not collect data more than absolutely necessary to function (such as your email and username, though you are free to anonymise them), serve advertisements, or is monetised in anyway. If you wonder why you do not see any GDPR notice, it is because absolutely nothing is done with your data and no permission is needed.</li>
                <li className="cardlike__terms-li">For the purpose of maintaining the app, I will occasionally have to look at your data in the database (not unlike a hotel manager looking inside your room to inspect it using a master key), but it will not happen more than necessary.</li>
                <li className="cardlike__terms-li">Your data is yours. You can choose to be anonymous. Email verification is only for the purpose of minimising potential bad actors. Data deletion requests are prioritised above all else.</li>
                <li className="cardlike__terms-li">Due to obligations with a full-time job and social duties, among other humanly mortal coils, I am unable to promise timely and thorough technical support, but I would try my best to answer queries within my capability.</li>
                <li className="cardlike__terms-li">I reserve the right to deny service and access to JustJot for any reason. This is quite difficult to happen; it is here just in case I absolutely have to exercise it.</li>
                <li className="cardlike__terms-li">I should not have to mention this, but JustJot is far from an ideal service to handle passwords, recovery phrases, crypto wallet mnemonics, classified documents, nuclear launch codes, or any other sensitive data.</li>
                <li className="cardlike__terms-li">It is okay for you to not use JustJot. In fact, if you are questioning, then you probably should not. There are plenty of more feature-complete and secure note-taking and bookmarking services out there.</li>
                <li className="cardlike__terms-li">I make nothing from running this (more like losing money, because of the domain cost). It was built because I enjoy making things. I am happy if JustJot is useful to you and would like to hear about it.</li>
                <li className="cardlike__terms-li">I am too busy to study lawsuits and tell which rights to waive, but considering that this is a passion project that cost nothing from the users, let us hope it would not come to that. If there is any issue or concern, please contact me.</li>
            </ul>
        </Card.Section>

        <Card.Section component="section" mt="xl">
            <Title order={2}>Acknowledgement</Title>
            <Text>
                JustJot was made possible thanks to the plethora of wonderful works from the open-source communities:
            </Text>
            <ul className="cardlike__acknowledgement-ul">
                <li>
                    <Anchor href="https://react.dev/" target='_blank' rel='noopener noreferrer'>React</Anchor>
                </li>
                <li>
                    <Anchor href="https://www.typescriptlang.org/" target='_blank' rel='noopener noreferrer'>TypeScript</Anchor>
                </li>
                <li>
                    <Anchor href="https://pocketbase.io/" target='_blank' rel='noopener noreferrer'>PocketBase</Anchor>
                </li>
                <li>
                    <Anchor href="https://pockethost.io/" target='_blank' rel='noopener noreferrer'>PocketHost</Anchor>
                </li>
                <li>
                    <Anchor href="https://mantine.dev/" target='_blank' rel='noopener noreferrer'>Mantine UI Library</Anchor></li>
                <li>
                    <Anchor href="https://icflorescu.github.io/mantine-contextmenu/" target='_blank' rel='noopener noreferrer'>Mantine ContextMenu</Anchor>
                </li>
                <li>
                    <Anchor href="https://sass-lang.com/" target='_blank' rel='noopener noreferrer'>SASS</Anchor>
                </li>
                <li>
                    <Anchor href="https://github.com/KingSora/OverlayScrollbars" target='_blank' rel='noopener noreferrer'>OverlayScrollbars</Anchor>
                </li>
            </ul>
            <Text mt="md">
                Very special thanks to <Anchor href="https://caseykwokdinata.webflow.io/" target='_blank' rel='noopener noreferrer'>Casey Kwokdinata</Anchor> for the design knowledge and support throughout the course of development.
            </Text>
            <Text mt="md">
                While not a direct contributor, the brilliant <Anchor href="https://bmrks.com/" target='_blank' rel='noopener noreferrer'>bmrks</Anchor> heavily inspired the creation of JustJot.
            </Text>
        </Card.Section>

    </Card>
};
