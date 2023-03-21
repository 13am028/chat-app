import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Home from "./pages/home/Home";
import DMPage from "./pages/dm/DMPage";
import UserSettingPage from "./pages/setting/UserSetting";
import Logout from "./pages/auth/Logout";
import React, { useEffect, useState } from 'react';
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

function App() {
    const [theme, setTheme] = useState(
        localStorage.getItem('theme') || 'light'
    );
    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.body.className = theme;
        document.body.setAttribute("data-theme", `${theme}-theme`);
    }, [theme]);
    return (

        <div className={`App ${theme}`}>
            <button onClick={toggleTheme} className={`Dark-Light-Button ${theme === 'dark' ? 'dark' : ''}`}>
                {theme === "light" ? (
                    <DarkModeIcon sx={{ fontSize: 24 }} />
                ) : (
                    <LightModeIcon sx={{ fontSize: 24 }} />
                )}
            </button>
            <BrowserRouter>
                <Routes>
                    <Route path="/">
                        <Route path="logout" element={<Logout />} />
                        <Route path="home" element={<Home theme={theme}/>} />
                        <Route path="dm" element={<DMPage />} />
                        <Route path="setting" element={<UserSettingPage />} />
                        <Route path="login" element={<Login theme={theme} toggleTheme={toggleTheme} />} />
                        <Route path="signup" element={<SignUp theme={theme} toggleTheme={toggleTheme} />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
