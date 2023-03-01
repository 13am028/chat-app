import React, {useState} from "react";
import "./Login1.css";
import styles from "./auth.module.css";
import logo from "../../logo.svg";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleRememberMeChange = (event) => {
        setRememberMe(event.target.checked);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Username:", username);
        console.log("Password:", password);
        console.log("Remember me:", rememberMe);

        // Redirect to Home page
        window.location.href = "/home";
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div className={styles.grid}>
            <div className={styles.bg}>
                <img
                    src="/logo3_text.png"
                    alt="logo3"

                />
            </div>
            <div className="login-form-container">
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="login-form-content">
                        <h3 className="login-form-title">Sign In</h3>
                        <div className="form-group-mt-3">
                            <label>Email address</label>
                            <input
                                type="email"
                                className="form-control mt-1"
                                placeholder="Enter email"
                                required
                                onChange={handleUsernameChange}
                            />
                        </div>
                        <div className="form-group-mt-3">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control mt-1"
                                placeholder="Enter password"
                                required
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button type="submit" className="create-account__submit">
                                Submit
                            </button>
                        </div>
                        <p className="forgot-password text-right mt-2">
                            <a href="#" className="create-account__link">
                                Forgot password?
                            </a>
                        </p>
                    </div>
                </form>
                <form>
                    <div className="signup-form-container">
                        <p className="signup-text">
                            Don't have an account?{" "}
                            <a href="/createAccount" className="create-account__link">
                                Sign up
                            </a>
                        </p>
                    </div>
                </form>
            </div>
            <div className={`mode-toggle ${isDarkMode ? "dark-mode" : "light-mode"}`}>
                <button
                    className="dark-mode-btn"
                    onClick={toggleDarkMode}
                    style={{
                        position: "fixed",
                        bottom: "20px",
                        right: "20px",
                        backgroundColor: "transparent",
                        border: "none",
                        outline: "none",
                        cursor: "pointer",
                    }}
                >
                    {isDarkMode ? (
                        <img
                            src="/dark-mode-toggle-icon.png"
                            alt="Dark mode"
                            style={{width: "44px", height: "24px"}}
                        />
                    ) : (
                        <img
                            src="/light-mode-toggle-icon.svg"
                            alt="Light mode"
                            style={{width: "44px", height: "24px"}}
                        />
                    )}
                </button>
            </div>
        </div>
    );
}

export default Login;
