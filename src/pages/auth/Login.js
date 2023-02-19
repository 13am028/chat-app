import React from 'react';
import styles from './auth.module.css'
import logo from '../../logo.svg'

const Login = () => {
    return (
        <div className={styles.grid}>
            <div className={styles.bg}>
                <p>This is auth page.</p>
                <img src={logo} className="App-logo" alt="logo" />
            </div>
            <div className={styles.login}>
                <h1>Log In</h1>
                <form>
                    <input type='email' placeholder='email'/>
                    <input type='password' placeholder='password'/>
                    <button type='submit'>Log In</button>
                </form>
                <p><a href='/signup'>Create new account</a></p>
            </div>
        </div>
    );
};

export default Login;