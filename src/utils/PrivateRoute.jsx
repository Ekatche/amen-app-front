import { Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const PrivateBackofficeRoute = ({ children, ...rest }) => {
    let { user } = useContext(AuthContext);
    return <Route {...rest}>{!user ? <Navigate to="/admin/login" /> : children}</Route>;
  };
  
export default PrivateBackofficeRoute;