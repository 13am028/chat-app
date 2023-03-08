import React, {useEffect, useState} from 'react';
import styles from './auth.module.css'
import logo from "../../logo.svg";
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
                <p>This is auth page.</p>
                <img src={logo} className="App-logo" alt="logo"/>
            </div>
            <div className={styles.login}>
                <h1>Sign Up</h1>
                <form>
                    <input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="Display Name"
                    />
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                    />
                    <input type='email' placeholder='email' value={email}
                           onChange={(e) => setEmail(e.target.value)}/>
                    <input type='password' placeholder='password' value={password}
                           onChange={(e) => setPassword(e.target.value)}/>
                    <input type='password' placeholder='confirm password' value={cPassword}
                            onChange={(e) => setCPassword(e.target.value)}/>
                    <Button onClick={register}>Confirm</Button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;