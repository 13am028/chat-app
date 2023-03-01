// Logout redirection 
import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {logout} from "../../firebase";

const Logout = () => {
    const navigate = useNavigate();
    useEffect(() => {
        logout().then(() => navigate("/login"));
    }, [navigate]);
    return null;
}

export default Logout;
