import React, { createContext, useState } from "react";
import "./createAccount.css";

export const ThemeContext = createContext(null);

function CreateAccount() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: submit form data to server

    // Validation checks
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Redirect to Home page
    window.location.href = "/home";
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    const app = document.querySelector(".create-account");
    app.classList.toggle("dark");
  };


  return (
    <div className="create-account">
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
              style={{ width: "44px", height: "24px" }}
            />
          ) : (
            <img
              src="/light-mode-toggle-icon.svg"
              alt="Light mode"
              style={{ width: "44px", height: "24px" }}
            />
          )}
        </button>
      </div>

      <div className="create-account__content">
        <h1 className="create-account__title">Create an account</h1>
        <form className="create-account__form" onSubmit={handleSubmit}>
          <div className="create-account__form-group">
            <label htmlFor="username" className="create-account__label">
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
          <div className="create-account__form-group">
            <label htmlFor="email" className="create-account__label">
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
          <div className="create-account__instructions">
            You can use letters, numbers & periods
          </div>
          <div className="create-account__form-group">
            <label htmlFor="password" className="create-account__label">
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
          <div className="create-account__instructions">
            Use 8 or more characters with a mix of letters, numbers & symbols
          </div>
          <div className="create-account__form-group">
            <label htmlFor="confirm-password" className="create-account__label">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              className="form-control mt-1"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
            />
          </div>
          <div className="create-account__form-group">
            <label
              htmlFor="terms"
              className="create-account__label create-account__label--checkbox"
            >
              <input
                type="checkbox"
                id="terms"
                className="create-account__checkbox"
                required
              />
              <span className="create-account__checkbox-custom"></span>
              <span className="create-account__checkbox-label">
                {" "}
                I agree to the{" "}
                <a href="#" className="create-account__link">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="create-account__link">
                  Privacy Policy
                </a>
              </span>
            </label>
          </div>
          <button className="create-account__submit" type="submit">
            Create Account
          </button>
          <p className="create-account__already-have-account">
            Already have an account?{" "}
            <a href="/login" className="create-account__link">
              Log in here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default CreateAccount;
