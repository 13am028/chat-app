import React, {useEffect, useState} from 'react';
import styles from './auth.module.css'
import './SignUp.css'
import Checkbox from '@mui/material/Checkbox';
import {
    auth,
    registerWithEmailAndPassword,
} from "../../firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {useNavigate} from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


const SignUp = (props) => {
    const { theme } = props;
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();


    const SignUpBox = () => {
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [cPassword, setCPassword] = useState("");
        const [displayName, setDisplayName] = useState("");
        const [username, setUsername] = useState("");
        const [showPassword, setShowPassword] = useState(false);
        const [cShowPassword, setCShowPassword] = useState(false);

        const formClasses = `signup__form ${theme === 'dark' ? 'dark' : ''}`;
        const inputClasses = `form-control mt-1 ${theme === 'dark' ? 'dark text-light' : ''}`;
        const instructionsClasses = `signup__instructions ${theme === 'dark' ? 'dark' : ''}`;
        const passwordInputClassNames = `form-control mt-1 ${theme === 'dark' ? 'dark text-light' : ''}`;

        const passwordInputStyles = {
            backgroundColor: theme === 'dark' ? '#333' : '',
            borderColor: theme === 'dark' ? 'transparent' : ''
        };
        const darkStyles = {
            backgroundColor: '#333',
            borderColor: 'transparent',
            color: 'white'
        };

        const lightStyles = {
            backgroundColor: '',
            borderColor: '',
            color: ''
        };

        const isValidPassword = (password) => {
            const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+~`|}{\[\]\\:';"<>,.?/]).{8,}$/;
            return passwordPattern.test(password);
        }

        const isEmailValid = (email) => {
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
            return emailPattern.test(email);
        };

        const CheckboxCustom = () => (
            <Checkbox
                style={{color: theme === 'dark' ? 'white' : '', marginLeft: -10}}
                id = "terms"
                required
            />
        );

        const register = async (e) => {
            e.preventDefault();
            if (!displayName || !username || !email || !password) {
                alert("Please fill in all fields.");
                return;
            }
            if (!isEmailValid(email)) {
                alert("Please enter a valid email address.");
                return;
            }
            // if (!isValidPassword(password)) {
            //     alert("Please enter a valid password. Your password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
            //     return;
            // }
            if (password !== cPassword) {
                alert("Passwords have to match");
                return;
            }
            // Check that the checkbox is checked
            const checkbox = document.getElementById("terms");
            if (!checkbox.checked) {
                alert("Please agree to the terms of service and privacy policy.");
                return;
            }
            try {
                const userCredential = await registerWithEmailAndPassword(username, displayName, email, password);
                if (userCredential) {
                    alert("User created successfully!");
                    navigate("/login");
                }
            } catch (error) {
                alert("Error creating user: " + error.message);
            }
        };

        useEffect(() => {
            if (loading) return;
            if (user) navigate("/login");
        }, [user, loading, navigate]);

        return (
            <form className={formClasses} >
                <div className="form-group-mt-3">
                    <h1 className="signup__title">Sign Up to chat with your friends and family</h1>
                    {[
                        {
                            label: "Display Name",
                            id: "displayName",
                            value: displayName,
                            onChange: (event) => setDisplayName(event.target.value),
                            type: "text"
                        },
                        {
                            label: "Username",
                            id: "username",
                            value: username,
                            onChange: (event) => setUsername(event.target.value),
                            type: "text"
                        },
                        {
                            label: "Email",
                            id: "email",
                            value: email,
                            onChange: (event) => setEmail(event.target.value),
                            type: "email"
                        },
                        {
                            label: "Password",
                            id: "password",
                            value: password,
                            onChange: (event) => setPassword(event.target.value),
                            type: "password"
                        },
                        {
                            label: "Confirm Password",
                            id: "confirm-password",
                            value: cPassword,
                            onChange: (event) => setCPassword(event.target.value),
                            type: "password"
                        },
                    ].map((inputProps, index) => (
                        <div className="form-group-mt-3" key={index}>
                            <label htmlFor={inputProps.id} className="signup__label">
                                {inputProps.label}
                            </label>
                            {inputProps.id === "password" || inputProps.id === "confirm-password" ? (
                                <div className="password-input-container">
                                    <input
                                        type={inputProps.id === "password" ? (showPassword ? "text" : "password") : (cShowPassword ? "text" : "password")}
                                        id={inputProps.id}
                                        className={passwordInputClassNames}
                                        style={passwordInputStyles}
                                        required
                                        value={inputProps.id === "password" ? password : cPassword}
                                        onChange={inputProps.id === "password" ? (e) => setPassword(e.target.value) : (e) => setCPassword(e.target.value)}
                                    />
                                    <div
                                        className="show-password-cpassword-icon"
                                        onClick={inputProps.id === "password" ?
                                            () => setShowPassword(!showPassword) :
                                            () => setCShowPassword(!cShowPassword)}
                                    >
                                        {inputProps.id === "password" ?
                                            (showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />) :
                                            (cShowPassword ? <VisibilityOffIcon /> : <VisibilityIcon />)
                                        }
                                    </div>
                                </div>
                            ) : (
                                <input
                                    type={inputProps.type}
                                    id={inputProps.id}
                                    className={inputClasses}
                                    style={theme === 'dark' ? darkStyles : lightStyles}
                                    value={inputProps.value}
                                    onChange={inputProps.onChange}
                                    required
                                />
                            )}
                            {inputProps.id === "email" && (
                                <div className={instructionsClasses}>You can use letters, numbers & periods</div>
                            )}
                            {inputProps.id === "password" && (
                                <div className={instructionsClasses}>Use 8 or more characters with a mix of letters,
                                    numbers & symbols</div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="form-group-mt-3">
                    <label htmlFor="terms" className="signup__label signup__label--checkbox">
                        <CheckboxCustom/>
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
                <button className="signup__submit" type="submit"  onClick={register}>
                    Sign Up
                </button>
                <p className="signup__already-have-account">
                    Already have an account?{" "}
                    <a href="/login" className="signup__link">
                        Log in here
                    </a>
                </p>
            </form>
        )
    };

    return (
        <div className={styles.grid}>
            <div className={`background ${theme === 'dark' ? 'dark': ''}`}>
                <img src="/logo3_1.png" alt="logo"/>
            </div>
            <div className="signup-form-container">
               <SignUpBox/>
            </div>
        </div>
    );
};

export default SignUp;