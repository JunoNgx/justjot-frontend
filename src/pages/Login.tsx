
export default function Login() {
    return <div className="login-wrapper">
        <div className="login">
            <h2>Login</h2>

            <form className="login__form">
                <div className="login__field">
                    <label>
                        <div className="login__label">Email</div>
                        <input
                            className="login__input"
                            required
                            type="email"
                            placeholder="Email"
                        />
                    </label>
                </div>
                <div className="login__field">
                    <label>
                        <div className="login__label">Password</div>
                        <input
                            className="login__input"
                            required
                            type="password"
                            placeholder="Password"
                        />
                    </label>
                </div>
                <div className="login__button-wrapper">
                    <button className="login__button" type="submit">
                        Login
                    </button>
                </div>
            </form>
        </div>
    </div>
}
