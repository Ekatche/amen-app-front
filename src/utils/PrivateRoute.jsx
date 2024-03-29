import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const PrivateBackofficeRoutes = () => {
  let { user } = useContext(AuthContext);
  return (
    user ? <Outlet /> : <Navigate to="admin/login"/>
  )
}

export const PrivateRoute = () => {
  let { user } = useContext(AuthContext);
  return (
    user ? <Outlet /> : <Navigate to="/login"/>
  )

}

export default PrivateBackofficeRoutes;