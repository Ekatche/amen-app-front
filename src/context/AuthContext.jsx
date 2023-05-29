
import { createContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null
    );
    const [refresh, setRefreshToken] = useState(()=>
    localStorage.getItem("refresh")
            ? JSON.parse(localStorage.getItem("refresh"))
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
            setRefreshToken(data.token.refresh);
            setUser(data.user);
            localStorage.setItem("authTokens", JSON.stringify(data.token.access));
            localStorage.setItem("user", JSON.stringify(data.first_name));
            localStorage.setItem("refresh", JSON.stringify(data.token.refresh));
            navigate("/");
        } else {
            alert("Authentication cerdentials are not good");
        }
    };

    const loginAdminUser = async (email, password) => {
        const response = await fetch("http://127.0.0.1:8000/api/user/backoffice/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });
        try {
            const data = await response.json();
            if (response.status === 200) {
                setAuthTokens(data.token.access);
                setRefreshToken(data.token.refresh);
                setUser(data.user);
                localStorage.setItem("authTokens", JSON.stringify(data.token.access));
                localStorage.setItem("user", JSON.stringify(data.first_name));
                localStorage.setItem("refresh", JSON.stringify(data.token.refresh));
                navigate("/admin");
            } else if (response.status === 403) {

                alert("You cannot acces this part of the app")

            }
            else {
                alert("Something went wrong");
            }
        } catch (error) {
            alert(error)
        }
    }



    // function used to register 
    const registerUser = async (email, password, password2, first_name,
        last_name, gender, phone_prefix, phone_number, birth_date) => {
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
            body: JSON.stringify({ refresh: `${refresh}` })
        })

        if (response.status === 200) {
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

    const logoubackofficetUser = async () => {
        const response = await fetch('http://localhost:8000/api/user/backoffice/logout/', {
            method: "Post",
            headers: {
                "Authorization": `Bearer  ${authTokens}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ refresh: `${refresh}` })
        })

        if (response.status === 200) {
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
        loading,
        authTokens,
        refresh,
        setAuthTokens,
        registerUser,
        loginUser,
        logoutUser,
        loginAdminUser,
        logoubackofficetUser,
        navigate,
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
