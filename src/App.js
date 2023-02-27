import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import React, { Component }  from 'react';
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Home from "./pages/home/Home";
import DMPage from "./pages/dm/DMPage";
import CreateAccount from "./pages/auth/createAccount";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route path="login" element={<Login />} />
                    <Route path="create-account" element={<CreateAccount />} />
                    <Route path="home" element={<Home />} />
                    <Route path="dm" element={<DMPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
