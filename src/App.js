import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Home from "./pages/home/Home";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<SignUp />} />
                    <Route path="home" element={<Home />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
