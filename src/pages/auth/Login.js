import React from 'react';
import styles from './auth.module.css'
import logo from '../../logo.svg'
import {useNavigate} from "react-router-dom";
import Button from "react-bootstrap/Button";

const Login = () => {

    let navigate = useNavigate();
    const routeChange = () =>{
        let path = '/home';
        navigate(path);
    }

    return (
        <div className={styles.grid}>
            <div className={styles.bg}>
                <p>This is auth page.</p>
                <img src={logo} className="App-logo" alt="logo"/>
            </div>
            <div className={styles.login}>
                <h1>Log In</h1>
                <form onSubmit={routeChange}>
                    <input type='email' placeholder='email'/>
                    <input type='password' placeholder='password'/>
                    <Button type='submit'>Log In</Button>
                </form>
                <p><a href='/create-account?#'>Create new account</a></p>

                <Button variant='dark' onClick={() => document.body.setAttribute("data-theme", "dark-theme")}>
                    Dark
                </Button>
                <Button variant='light' onClick={() => document.body.setAttribute("data-theme", "")}>
                    Light
                </Button>
            </div>
        </div>
    );
};

export default Login;