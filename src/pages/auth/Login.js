import styles from './auth.module.css'
import Button from "react-bootstrap/Button";
import React, {useEffect, useState} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {Link, useNavigate} from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {auth, logInWithEmailAndPassword, signInWithGoogle} from "../../firebase";
import "./Login.css"


const Login = (props) => {
    const {theme} = props;
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (user) navigate("/home");
    }, [user, loading, navigate]);

    const SignInWithGoogleButton = () => {
        return (
            <Button
                className={`signInWithGoogleButton ${theme === 'dark' ? 'dark' : ''}`}
                onClick={signInWithGoogle}
            >
                <img
                    src="https://companieslogo.com/img/orig/GOOG-0ed88f7c.png?t=1633218227"
                    alt="Google logo"
                />
                Sign in with Google
            </Button>
        );
    };

    const SignUpBox = () => {
        return (
            <form>
                <div className={`signup-box ${theme === 'dark' ? 'dark' : ''}`}>
                    <p className="signup-text">
                        Don't have an account?{' '}
                        <Link to="/SignUp" className="signup_link">
                            Sign up
                        </Link>
                    </p>
                </div>
            </form>
        );
    };

    const LoginBox = () => {
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [showPassword, setShowPassword] = useState(false);
        const handleSubmit = async (e) => {
            e.preventDefault();
            const userCredential = await logInWithEmailAndPassword(email, password);
            // Signed in
            if (userCredential) {
                alert("Logged in successfully");
                navigate("/home");
            } else {
                navigate("/login");
            }
        };

        const loginFormClassNames = `login-form ${theme === 'dark' ? 'dark' : ''}`;
        const emailInputClassNames = `form-control mt-1 ${theme === 'dark' ? 'dark text-light' : ''}`;
        const passwordInputClassNames = `form-control mt-1 ${theme === 'dark' ? 'dark text-light' : ''}`;
        const emailInputStyles = {
            backgroundColor: theme === 'dark' ? '#333' : '',
            borderColor: theme === 'dark' ? 'transparent' : ''
        };
        const passwordInputStyles = {
            backgroundColor: theme === 'dark' ? '#333' : '',
            borderColor: theme === 'dark' ? 'transparent' : ''
        };

        return (
            <form className={loginFormClassNames}>
                <div className="login-form-content">
                    <h3 className="login-form-title">Sign In</h3>
                    <div className="form-group-mt-3">
                        <label>Email address</label>
                        <input
                            type="email"
                            id="email"
                            className={emailInputClassNames}
                            style={emailInputStyles}
                            placeholder="Enter email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group-mt-3 password-input-container">
                        <label>Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            className={passwordInputClassNames}
                            style={passwordInputStyles}
                            placeholder="Enter password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}

                        />
                        <div
                            className="show-password-icon"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <VisibilityOffIcon/>
                            ) : (
                                <VisibilityIcon/>
                            )}
                        </div>
                    </div>

                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="login_submit" onClick={handleSubmit}>
                            Login
                        </button>
                    </div>
                    <p className="forgot-password text-right mt-2">
                        <a href="#" className="signup_link">
                            Forgot password?
                        </a>
                    </p>
                </div>
            </form>
        )
    }

    return (
        <div className={styles.grid}>
            <div className={`background ${theme === 'dark' ? 'dark' : ''}`}>
                <img src="/logo3_1.png" alt="logo"/>
            </div>
            <div className="login-form-container">
                <LoginBox/>
                <SignInWithGoogleButton/>
                <div className="divider">
                    <hr className="divider-line"/>
                    <span className="divider-text">or</span>
                    <hr className="divider-line"/>
                </div>
                <SignUpBox/>
            </div>
        </div>
    );
};

export default Login;