import React from 'react';
import styles from './auth.module.css'
import logo from "../../logo.svg";

const SignUp = () => {
    return (
        <div className={styles.grid}>
            <div className={styles.bg}>
                <p>This is auth page.</p>
                <img src={logo} className="App-logo" alt="logo" />
            </div>
            <div className={styles.login}>
                <h1>Sign Up</h1>
                <form>
                    <input type='email' placeholder='email'/>
                    <input type='password' placeholder='password'/>
                    <input type='password' placeholder='confirm password'/>
                    <button type='submit'>Confirm</button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;