import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const baseURL = "http://127.0.0.1:8000/api";

const useAxios = () => {
    const { authTokens, setAuthTokens, refresh, setUser,navigate  } = useContext(AuthContext);

    const axiosInstance = axios.create({
        baseURL,
        headers: {
            Authorization: `Bearer  ${authTokens}`,
            "Content-Type": "application/json",
        }
    })

    axiosInstance.interceptors.request.use(async req => {
        const user = jwt_decode(authTokens);
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

        if (!isExpired) {
            console.log("token not expired");
            return req
        };

        const response = await axios.post(`${baseURL}/token/refresh/`, {
            "refresh": refresh
        }).catch((error)=>{
            // if token exipred go to the connection page
            const status = error.response.status
            if (status === 401 ) {
                navigate("admin/login")
            }
        });

        localStorage.setItem("authTokens", JSON.stringify(response.data.access));

        setAuthTokens(response.data.access);

        req.headers.Authorization = `Bearer ${response.data.access}`;
        console.log("refresh successfull");
        return req;
    });

    return axiosInstance;
}

export default useAxios;