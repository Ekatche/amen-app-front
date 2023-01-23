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
import ViewProduct from "./products/Viewproduct";
import AddProduct from "./products/Addproduct";
import ViewPromotion from "./products/Viewpromotion";
import AddPromotion from "./products/Addpromotion";
import ViewCoupon from "./products/Viewcoupon";
import AddCoupon from "./products/Addcoupon";
import ViewUser from "./users/ViewUser";
import AllOrders from "./orders/Allorders";
import ViewOrder from  "./orders/Vieworders"
import ViewOrderItems from "./orders/OrderItem";

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
                {/* Users */}
                <Route
                    path="users"
                    element={
                        <>
                            <AdminNavBar />
                            <AllUsers />
                        </>
                    }
                />
                <Route
                    path="user/:id"
                    element={
                        <>
                            <AdminNavBar />
                            <ViewUser />
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
                            <AddProduct />
                        </>

                    }
                />
                <Route
                    path="product/:id"
                    element={
                        <>
                            <AdminNavBar />
                            <ViewProduct />
                        </>

                    }
                />
                {/* Orders */}
                <Route
                    path="orders"
                    element={
                        <>
                            <AdminNavBar />
                            <AllOrders />
                        </>

                    }
                />
                <Route
                    path="order/:id"
                    element={
                        <>
                            <AdminNavBar />
                            <ViewOrder />
                        </>

                    }
                />
                <Route
                    path="order-item/:id"
                    element={
                        <>
                            <AdminNavBar />
                            <ViewOrderItems />
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
                            <AddPromotion />
                        </>

                    }
                />
                <Route
                    path="promotion/:id"
                    element={
                        <>
                            <AdminNavBar />
                            <ViewPromotion />
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
                            <AddCoupon />
                        </>

                    }
                />
                <Route
                    path="coupon/:id"
                    element={
                        <>
                            <AdminNavBar />
                            <ViewCoupon />
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