import { Link } from "react-router-dom";

export default function ProfileChangePassword() {
    return <div className="Profile">
        <h3 className="Profile__Title">
            Change password
        </h3>
        
        <p>For password changes, please use the <Link to="/reset">password reset form</Link>.</p>
    </div>
}
