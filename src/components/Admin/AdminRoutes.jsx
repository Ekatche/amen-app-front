import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import AddCategory from "./category/AddCategory";
import AllCategories from "./category/ViewCategory";
import AdminNavBar from "../../components/Navbar/AdminNavbar"
import AdminHome from '../../pages/Admin/AdminHome';
import AllProducts from "./products/Allproducts";
import AllSubcategories from "./category/AllSubCatgories";
import AllUsers from "./users/Allusers";
import AllCoupons from "./products/Allcoupons";
import AllPromotion from "./products/Allpromotions";


function AdminRoutes() {
    return (
        <div>
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <AdminNavBar />
                            <AdminHome />
                        </>
                    } />

                <Route
                    path="/categories/"
                    element={
                        <>
                            <AdminNavBar />
                            <AllCategories />
                            
                        </>
                    }>
                    <Route path=":catID" element={
                        <>
                            <h1> Single category</h1>
                        </>
                    }/>

                    <Route
                        path="add"
                        element={<AddCategory />}
                    />
                </Route>

                <Route
                    path="/users"
                    element={
                        <>
                            <AdminNavBar />
                            <AllUsers />
                        </>
                    }
                />
                <Route
                    path="/products"
                    element={
                        <>
                            <AdminNavBar />
                            <AllProducts />
                        </>

                    }
                />
                <Route
                    path="/promotions"
                    element={
                        <>
                            <AdminNavBar />
                            <AllPromotion />
                        </>

                    }
                />
                <Route
                    path="/coupons"
                    element={
                        <>
                            <AdminNavBar />
                            <AllCoupons />
                        </>

                    }
                />
                <Route
                    path="/subcategories"
                    element={
                        <>
                            <AdminNavBar />
                            <AllSubcategories />
                        </>
                    }
                />
            </Routes>
        </div>
    )
}

export default AdminRoutes;