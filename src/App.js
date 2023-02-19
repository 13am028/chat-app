import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<SignUp />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
