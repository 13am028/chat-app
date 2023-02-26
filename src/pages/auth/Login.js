import styles from './auth.module.css'
import logo from '../../logo.svg'
import Button from "react-bootstrap/Button";
import React, {useEffect, useState} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {useNavigate} from "react-router-dom";
import {auth, logInWithEmailAndPassword, signInWithGoogle} from "../../firebase";

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

    return (
        <div className={styles.grid}>
            <div className={styles.bg}>
                <p>This is auth page.</p>
                <img src={logo} className="App-logo" alt="logo"/>
            </div>
            <div className={styles.login}>
                <h1>Log In</h1>
                <form>
                    <input type='email' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input type='password' placeholder='password' value={password}
                           onChange={(e) => setPassword(e.target.value)}/>
                    <Button type='submit' onClick={() => logInWithEmailAndPassword(email, password)}>Log In</Button>
                </form>
                <p><a href='/signup'>Create new account</a></p>

                <Button variant='dark' onClick={() => document.body.setAttribute("data-theme", "dark-theme")}>
                    Dark
                </Button>
                <Button variant='light' onClick={() => document.body.setAttribute("data-theme", "")}>
                    Light
                </Button>
                <Button onClick={signInWithGoogle}>Login with Google</Button>
            </div>
        </div>
    );
};

export default Login;