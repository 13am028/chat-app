import React, {useEffect, useState} from 'react';
import styles from './auth.module.css'
import logo from "../../logo.svg";
import './SignUp.css'
import Button from "react-bootstrap/Button";

import {
    auth,
    registerWithEmailAndPassword,
} from "../../firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {useNavigate} from "react-router-dom";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [username, setUsername] = useState("");
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    const register = async () => {
        if (password !== cPassword) alert("passwords have to match")
        else await registerWithEmailAndPassword(username, displayName, email, password);
    };

    useEffect(() => {
        if (loading) return;
        if (user) navigate("/login");
    }, [user, loading, navigate]);
    return (
        <div className={styles.grid}>
            <div className={styles.bg}>
                <img src="/logo3_text.png" alt="logo"/>
            </div>
            <div className="signup-form-container">

                <form className="signup__form" onSubmit={register}>
                    <div className="form-group-mt-3">
                        <h1 className="signup__title">Sign Up to chat with your friends and family</h1>
                        <label htmlFor="displayName" className="signup__label">
                            Display Name
                        </label>
                        <input
                            type="text"
                            id="displayName"
                            className="form-control mt-1"
                            value={displayName}
                            onChange={(event) => setDisplayName(event.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group-mt-3">
                        <label htmlFor="username" className="signup__label">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="form-control mt-1"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group-mt-3">
                        <label htmlFor="email" className="signup__label">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="form-control mt-1"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />
                    </div>
                    <div className="signup__instructions">
                        You can use letters, numbers & periods
                    </div>
                    <div className="form-group-mt-3">
                        <label htmlFor="password" className="signup__label">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="form-control mt-1"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                    </div>
                    <div className="signup__instructions">
                        Use 8 or more characters with a mix of letters, numbers & symbols
                    </div>
                    <div className="form-group-mt-3">
                        <label htmlFor="confirm-password" className="signup__label">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirm-password"
                            className="form-control mt-1"
                            value={cPassword}
                            onChange={(event) => setCPassword(event.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group-mt-3">
                        <label
                            htmlFor="terms"
                            className="signup__label signup__label--checkbox"
                        >
                            <input
                                type="checkbox"
                                id="terms"
                                className="signup__checkbox"
                                required
                            />
                            <span className="signup__checkbox-custom"></span>
                            <span className="signup__checkbox-label">
                {" "}
                                I agree to the{" "}
                                <a href="#" className="signup__link">
                  Terms of Service
                </a>{" "}
                                and{" "}
                                <a href="#" className="signup__link">
                  Privacy Policy
                </a>
              </span>
                        </label>
                    </div>
                    <button className="signup__submit" type="submit">
                        Sing Up
                    </button>
                    <p className="signup__already-have-account">
                        Already have an account?{" "}
                        <a href="/login" className="signup__link">
                            Log in here
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignUp;