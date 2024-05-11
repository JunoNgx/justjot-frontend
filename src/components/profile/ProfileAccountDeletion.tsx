import "./Profile.scss";

export default function ProfileAccountDeletion() {
    return <section className="Profile">
        <h3 className="Profile__Title">
            Account deletion
        </h3>
        
        <p>For account deletion (which will also result in the permanent and irreversible destruction of your data), please send an email request:</p>
        <ul>
            <li>From the email address associated with the account to be deleted, as verification.</li>
            <li>To the developer email address.</li>
            <li>With the email subject:</li>
        </ul>

        <code>[JustJot] Account deletion request</code>

    </section>
}
