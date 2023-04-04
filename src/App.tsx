import './App.css'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import Login from './pages/auth/Login'
import SignUp from './pages/auth/SignUp'
import Home from './pages/home/Home'
import DMPage from './pages/dm/DMPage'
import UserSettingPage from './pages/setting/UserSetting'
import Logout from './functions/logout'
import Group from './pages/group/Group'
import React, { useEffect, useState } from 'react'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import { AuthContextProvider } from './components/context/AuthContext'
import { ChatContextProvider } from './components/context/ChatContext'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './firebase/init'

function ThemeToggleButton({ theme, toggleTheme }: any) {
    return (
        <button
            onClick={toggleTheme}
            className={`Dark-Light-Button ${theme === 'dark' ? 'dark' : ''}`}
        >
            {theme === 'light' ? (
                <DarkModeIcon sx={{ fontSize: 24 }} />
            ) : (
                <LightModeIcon sx={{ fontSize: 24 }} />
            )}
        </button>
    )
}

function ProtectedRoutes({ children }: any) {
    const navigate = useNavigate()
    const [user, loading] = useAuthState(auth)

    if (!user && !loading) {
        navigate('/login')
        return null
    }
    return <>{children}</>
}

function App() {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

    useEffect(() => {
        localStorage.setItem('theme', theme)
        document.body.className = theme
        document.body.setAttribute('data-theme', `${theme}-theme`)
    }, [theme])

    return (
        <AuthContextProvider>
            <ChatContextProvider>
                <div className={`App ${theme}`}>
                    <ThemeToggleButton
                        theme={theme}
                        toggleTheme={toggleTheme}
                    />
                    <BrowserRouter>
                        <Routes>
                            <Route path="/">
                                <Route path="logout" element={<Logout />} />
                                <Route
                                    path="/"
                                    element={
                                        <ProtectedRoutes>
                                            <Home />
                                        </ProtectedRoutes>
                                    }
                                />
                                <Route
                                    path="home"
                                    element={
                                        <ProtectedRoutes>
                                            <Home
                                                theme={theme}
                                                toggleTheme={toggleTheme}
                                            />
                                        </ProtectedRoutes>
                                    }
                                />
                                <Route
                                    path="dm"
                                    element={
                                        <ProtectedRoutes>
                                            <DMPage />
                                        </ProtectedRoutes>
                                    }
                                />
                                <Route
                                    path="setting"
                                    element={
                                        <ProtectedRoutes>
                                            <UserSettingPage />
                                        </ProtectedRoutes>
                                    }
                                />
                                <Route
                                    path="login"
                                    element={
                                        <Login
                                            theme={theme}
                                            toggleTheme={toggleTheme}
                                        />
                                    }
                                />
                                <Route
                                    path="signup"
                                    element={
                                        <SignUp
                                            theme={theme}
                                            toggleTheme={toggleTheme}
                                        />
                                    }
                                />
                            </Route>
                            <Route
                                path="server-chat"
                                element={
                                    <ProtectedRoutes>
                                        <Group />
                                    </ProtectedRoutes>
                                }
                            ></Route>
                        </Routes>
                    </BrowserRouter>
                </div>
            </ChatContextProvider>
        </AuthContextProvider>
    )
}

export default App
