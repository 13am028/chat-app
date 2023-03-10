import styles from './auth.module.css'
import Button from "react-bootstrap/Button";
import React, {useEffect, useState} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {useNavigate} from "react-router-dom";
import {auth, logInWithEmailAndPassword, signInWithGoogle} from "../../firebase";
import "./Login.css"

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (user) navigate("/home");
    }, [user, loading, navigate]);

    const handleUsernameChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Username:", email);
        console.log("Password:", password);

        // Redirect to Home page
        window.location.href = "/home";
    };


    return (
        <div className={styles.grid}>
            <div className={styles.bg}>
                <img src="/logo3_text.png" alt="logo"/>
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
                            <button type="submit" className="signin__submit">
                                Login
                            </button>
                        </div>
                        <p className="forgot-password text-right mt-2">
                            <a href="#" className="signin__link">
                                Forgot password?
                            </a>
                        </p>
                    </div>
                </form>
                <button className="signInWithGoogleButton" onClick={signInWithGoogle}>
                    <img
                        src="https://companieslogo.com/img/orig/GOOG-0ed88f7c.png?t=1633218227"
                        alt="Google logo"
                    />
                    Sign in with Google
                </button>
                <div className="divider">
                    <hr className="divider-line"/>
                    <span className="divider-text">or</span>
                    <hr className="divider-line"/>
                </div>
                <form>
                    <div className="signup-box">
                        <p className="signup-text">
                            Don't have an account?{" "}
                            <a href="/SignUp" className="signin__link">
                                Sign up
                            </a>
                        </p>
                    </div>
                </form>
            </div>
            {/*<div className={`mode-toggle ${isDarkMode ? "dark-mode" : "light-mode"}`}>*/}
            {/*    <button*/}
            {/*        className="dark-mode-btn"*/}
            {/*        onClick={toggleDarkMode}*/}
            {/*        style={{*/}
            {/*            position: "fixed",*/}
            {/*            bottom: "20px",*/}
            {/*            right: "20px",*/}
            {/*            backgroundColor: "transparent",*/}
            {/*            border: "none",*/}
            {/*            outline: "none",*/}
            {/*            cursor: "pointer",*/}
            {/*        }}*/}
            {/*    >*/}
            {/*        {isDarkMode ? (*/}
            {/*            <img*/}
            {/*                src="/dark-mode-toggle-icon.png"*/}
            {/*                alt="Dark mode"*/}
            {/*                style={{width: "44px", height: "24px"}}*/}
            {/*            />*/}
            {/*        ) : (*/}
            {/*            <img*/}
            {/*                src="/light-mode-toggle-icon.svg"*/}
            {/*                alt="Light mode"*/}
            {/*                style={{width: "44px", height: "24px"}}*/}
            {/*            />*/}
            {/*        )}*/}
            {/*    </button>*/}
            {/*</div>*/}


            <Button variant='dark' onClick={() => document.body.setAttribute("data-theme", "dark-theme")}>
                Dark
            </Button>
            <Button variant='light' onClick={() => document.body.setAttribute("data-theme", "")}>
                Light
            </Button>

        </div>
    );
};

export default Login;