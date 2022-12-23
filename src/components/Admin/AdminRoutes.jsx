import React from "react";
import { Route, Routes } from "react-router-dom";
import AddCategory from "./category/AddCategory";
import AllCategories from "./category/AllCategories";
import AdminNavBar from "../../components/Navbar/AdminNavbar"
import AdminHome from '../../pages/Admin/AdminHome';
import AllProducts from "./products/Allproducts";
import AllSubcategories from "./category/AllSubCatgories";
import AllUsers from "./users/Allusers";
import AllCoupons from "./products/Allcoupons";
import AllPromotion from "./products/Allpromotions";
import ViewCategory from "./category/ViewCategory";
import ViewSubCategory from "./category/ViewSubcategory";
import AddSubCategory from "./category/AddSubCategory";

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

                {/* categories */}

                <Route
                    path="categories"
                    element={
                        <>
                            <AdminNavBar />
                            <AllCategories />

                        </>
                    }>
                </Route>
                <Route
                    path="category/add"
                    element={
                        <>
                            <AdminNavBar />
                            <AddCategory />
                        </>
                    }
                />
                <Route
                    path="category/:id"
                    element={
                        <>
                            <AdminNavBar />
                            <ViewCategory />
                        </>
                    }
                />

                <Route
                    path="users"
                    element={
                        <>
                            <AdminNavBar />
                            <AllUsers />
                        </>
                    }
                />
                {/* products */}

                <Route
                    path="products"
                    element={
                        <>
                            <AdminNavBar />
                            <AllProducts />
                        </>

                    }
                />
                <Route
                    path="product/add"
                    element={
                        <>
                            <AdminNavBar />
                            <AllProducts />
                        </>

                    }
                />
                <Route
                    path="product/:id"
                    element={
                        <>
                            <AdminNavBar />
                            <AllProducts />
                        </>

                    }
                />

                {/* promotions */}
                <Route
                    path="promotions"
                    element={
                        <>
                            <AdminNavBar />
                            <AllPromotion />
                        </>

                    }
                />
                <Route
                    path="promotion/add"
                    element={
                        <>
                            <AdminNavBar />
                            <AllPromotion />
                        </>

                    }
                />
                <Route
                    path="promotion/:id"
                    element={
                        <>
                            <AdminNavBar />
                            <AllPromotion />
                        </>

                    }
                />

                {/* coupons */}
                <Route
                    path="coupons"
                    element={
                        <>
                            <AdminNavBar />
                            <AllCoupons />
                        </>

                    }
                />
                <Route
                    path="coupon/add"
                    element={
                        <>
                            <AdminNavBar />
                            <AllCoupons />
                        </>

                    }
                />
                <Route
                    path="coupon/:id"
                    element={
                        <>
                            <AdminNavBar />
                            <AllCoupons />
                        </>

                    }
                />

                {/* subcategories */}
                <Route
                    path="subcategories"
                    element={
                        <>
                            <AdminNavBar />
                            <AllSubcategories />
                        </>
                    }
                />
                <Route
                    path="subcategory/add"
                    element={
                        <>
                            <AdminNavBar />
                            <AddSubCategory />
                        </>
                    }
                />
                <Route
                    path="subcategory/:id"
                    element={
                        <>
                            <AdminNavBar />
                            <ViewSubCategory />
                        </>
                    }
                />
            </Routes>
        </div>
    )
}

export default AdminRoutes;