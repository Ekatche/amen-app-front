import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminRoutes from "../components/Admin/AdminRoutes";
import Home from "../pages/Home/HomePage";
import LoginPage from "../pages/Login/LoginPage";
import NavBar from "../components/Navbar/navbar";
import Footer from "../components/Footer/Footer";
import Register from "../pages/Register/RegisterPage";
import PrivateBackofficeRoutes from "../utils/PrivateRoute";
import AdminLoginPage from "../pages/Login/AdminLoginPage"


export default function AllRoutes() {
    return (
        <div>
            <Routes>
                <Route path="/" element=
                    {
                        <>
                            <NavBar />
                            < Home />
                        </>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <>
                            <NavBar />
                            <LoginPage />
                            <Footer />
                        </>
                    }
                />
                <Route
                    path="/register"
                    element=
                    {<>
                        <NavBar />
                        <Register />
                        <Footer />
                    </>}
                />
                {/* Admin page  */}
                <Route
                    path="/admin/login"
                    element={
                        <>
                            <AdminLoginPage />
                        </>
                    }
                />
                <Route element={<PrivateBackofficeRoutes />}>
                    <Route
                        path="/admin/*"
                        element={
                            <>
                                <AdminRoutes />
                            </>
                        }
                    />
                </Route>
            </Routes>
        </div>
    )
}


