import { useForm } from "react-hook-form";

type LoginFormData = {email: string, password: string};

export default function Login() {
    // TODO: if isLoggedIn Navigate to /:username

    const { register, handleSubmit } = useForm<LoginFormData>();

    const attemptLogin = (data: LoginFormData) => {
        // TODO submit to backend
    }

    return <div className="login-wrapper">
        <div className="login">
            <h2>Login</h2>

            <form className="login__form" onSubmit={handleSubmit(attemptLogin)}>
                <div className="login__field">
                    <label>
                        <div className="login__label">Email</div>
                        <input
                            className="login__input"
                            required
                            type="email"
                            placeholder="Email"
                            {...register("email")}
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
                            {...register("password")}
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
