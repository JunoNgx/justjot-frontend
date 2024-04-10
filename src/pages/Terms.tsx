import { Box, Paper, Text, Title } from "@mantine/core";

export default function Terms() {

    return <Paper className="account-modal account-modal--terms"
        p="md"
        component="article"
    >
        <Box component="section">
            <Title order={2}>Terms and Conditions</Title>
            <Text>
                These are not exactly "terms and conditions" per se (I needed your attention nevertheless); more like things you should be aware of and acknowledge before signing up.
            </Text>
            <ul className="account-modal__terms-ul">
                <li className="account-modal__terms-li">As of time of writing, JustJot is not a commercial company, but the output of hobbyist project from a momentarily over-enthusiatic software developer.</li>
                <li className="account-modal__terms-li">JustJot does not collect data more than absolutely necessary to function (such as your email and username, though you are free to anonymise them), serves advertisements, or is monetised in anyway. If you wonder why you do not see any GDPR notice, it is because absolutely nothing is done with your data and no permission is needed.</li>
                <li className="account-modal__terms-li">For the purpose of maintaining the app, I will occasionally have to look at your data in the database (not unlike a hotel manager looking inside your room to inspect it using a master key), but it will not happen more than necesssary.</li>
                <li className="account-modal__terms-li">Your data is yours. You can choose to be anonymous. Email verification is only for the purpose of minimising potential bad actors. Data deletion requests are prioritised above all else.</li>
                <li className="account-modal__terms-li">Due to obligations with the full-time job, social duties, among other humanly mortal coils, I am unable to promise timely and thorough technical support, but I would try my best to answer queries within my capability.</li>
                <li className="account-modal__terms-li">I reserve the right to deny service and access to JustJot for any reason. This is quite difficult to happen; it is here just in case I absolutely have to exercise it.</li>
                <li className="account-modal__terms-li">I should not have to mention this, but JustJot is far from an ideal service to handle passwords, recovery phrases, crypto wallet mnemonics, classified documents, nuclear launch codes, or any other sensitive data.</li>
                <li className="account-modal__terms-li">It is okay for you to not use JustJot. In fact, if you are questioning, then you probably should not. There are plenty of more feature-complete and more secured note-taking and bookmarking services out there.</li>
                <li className="account-modal__terms-li">I make nothing from running this (more like losing money, because of the domain cost). It was built because I enjoyed making things. I am happy if JustJot is useful to you and would like to hear about it.</li>
                <li className="account-modal__terms-li">I am too busy to study lawsuits and tell which rights to waive, but considering that this is a passion project that cost nothing from the users, let us hope it would not come to that. If there is any issue or concern, please contact me.</li>
            </ul>
        </Box>

        <Box component="section" mt="xl">
            <Text>
                JustJot was made possible thanks to the pleathora of wonderful works from the open-source communities:
            </Text>
            <ul className="account-modal__terms-ul">
                
            </ul>
        </Box>

    </Paper>
};
