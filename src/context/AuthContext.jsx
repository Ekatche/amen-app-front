
import { createContext, useState, useEffect } from "react";
import {useNavigate } from 'react-router-dom';
const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null
    );
    const [user, setUser] = useState(() =>
        localStorage.getItem('user')
            ? JSON.parse(localStorage.getItem('user'))
            : null
    );
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    //   function used to login to the service 

    const loginUser = async (email, password) => {
        const response = await fetch("http://127.0.0.1:8000/api/user/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });
        const data = await response.json();

        if (response.status === 200) {
            setAuthTokens(data.token.access);
            setUser(data.first_name);
            localStorage.setItem("authTokens", JSON.stringify(data.token.access));
            localStorage.setItem("user", JSON.stringify(data.first_name));
            navigate("/");
        } else {
            alert("Authentication cerdentials are not good");
        }
    };

    // function used to register 
    const registerUser = async (email,password,password2,first_name,
                    last_name,gender,phone_prefix,phone_number,birth_date) => {
        const response = await fetch("http://localhost:8000/api/user/signup/", {
            method: "POST",
            body: JSON.stringify({
                email,
                password,
                password2,
                first_name,
                last_name,
                gender,
                phone_prefix,
                phone_number,
                birth_date,
            })
        });
        if (response.status === 201) {
            navigate("/login");
        } else {
            alert("The acount already exist!");
        }
    };

    //   function used to logout of the app 

    const logoutUser = async () => {
        const response = await fetch('http://localhost:8000/api/user/logout/', {
            method: "Post",
            headers: {
                "Authorization": `Bearer ${authTokens}`,
                "Content-Type": "application/json"
             },
        })

        if (response.status === 200 ) {
            setAuthTokens(null);
            setUser(null);
            localStorage.removeItem("authTokens");
            localStorage.removeItem("user");
            navigate("/");
            alert("logget out successfully")
        } else {
            alert("Something went wrong")
        }


    };

    const contextData = {
        user,
        setUser,
        authTokens,
        setAuthTokens,
        registerUser,
        loginUser,
        logoutUser
    };

    useEffect(() => {
        // alert('I am on use effect')
        if (authTokens) {
            setUser(user);
        }
        setLoading(false);
    }, [authTokens, user, loading]);

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};
