import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminRoutes from "../components/Admin/AdminRoutes";
import Home from "../pages/Home/HomePage";
import LoginPage from "../pages/Login/LoginPage";
import Footer from "../components/Footer/Footer";
import Register from "../pages/Register/RegisterPage";
import PrivateBackofficeRoutes from "../utils/PrivateRoute";
import { PrivateRoute } from "../utils/PrivateRoute";
import AdminLoginPage from "../pages/Login/AdminLoginPage";
import CustomNavbar from "../components/Navbar/Commercial/NewNavbar";
import UserAccount from "../pages/User/UserAccount";

// Products import
// Hommes
import ProduitsHommes from "../pages/Categories/Homme/ProductsHomme";
import { ViewProductHomme } from "../pages/Categories/Homme/ViewProductHommes";
// Femmes
import ProduitsFemmes from "../pages/Categories/Femme/ProduitsFemme";
import { ViewProductFemmes } from "../pages/Categories/Femme/ViewProductFemmes";
// enfant
import ProduitsEnfants from "../pages/Categories/Enfants/ProduitsEnfants";
import { ViewProductEnfant } from "../pages/Categories/Enfants/ViewProductEnfants";
// coffrets
import { ViewCoffret } from "../pages/Categories/Coffrets/ViewCoffret";
import Coffrets from "../pages/Categories/Coffrets/Coffrets";

export default function AllRoutes() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <CustomNavbar />
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="login"
          element={
            <>
              <CustomNavbar />
              <LoginPage />
              <Footer />
            </>
          }
        />
        <Route
          path="register"
          element={
            <>
              <CustomNavbar />
              <Register />
              <Footer />
            </>
          }
        />
        {/* user account */}
        <Route element={<PrivateRoute />}>
          <Route
            path="account"
            element={
              <>
                <CustomNavbar />
                <UserAccount />
                <Footer />
              </>
            }
          />
        </Route>
        {/* Admin page  */}
        <Route
          path="admin/login"
          element={
            <>
              <AdminLoginPage />
            </>
          }
        />
        <Route element={<PrivateBackofficeRoutes />}>
          <Route
            path="admin/*"
            element={
              <>
                <AdminRoutes />
              </>
            }
          />
        </Route>
        {/* Produits Hommes */}
        <Route
          path="homme"
          element={
            <>
              <CustomNavbar />
              <ProduitsHommes />
              <Footer />
            </>
          }
        />
        <Route
          path="homme/:id"
          element={
            <>
              <CustomNavbar />
              <ViewProductHomme />
              <Footer />
            </>
          }
        />
        {/* Produits Femmes  */}

        <Route
          path="femme"
          element={
            <>
              <CustomNavbar />
              <ProduitsFemmes />
              <Footer />
            </>
          }
        />
        <Route
          path="femme/:id"
          element={
            <>
              <CustomNavbar />
              <ViewProductFemmes />
              <Footer />
            </>
          }
        />

        {/* Produits enfants */}

        <Route
          path="enfant"
          element={
            <>
              <CustomNavbar />
              <ProduitsEnfants />
              <Footer />
            </>
          }
        />
        <Route
          path="enfant/:id"
          element={
            <>
              <CustomNavbar />
              <ViewProductEnfant />
              <Footer />
            </>
          }
        />

        {/* Coffrets */}

        <Route
          path="coffret"
          element={
            <>
              <CustomNavbar />
              <Coffrets />
              <Footer />
            </>
          }
        />
        <Route
          path="coffret/:id"
          element={
            <>
              <CustomNavbar />
              <ViewCoffret />
              <Footer />
            </>
          }
        />
      </Routes>
    </div>
  );
}
