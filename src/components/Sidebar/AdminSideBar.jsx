import React from "react";
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import * as BiIcons from "react-icons/bi"
import * as RiIcons from "react-icons/ri"
import * as TbIcons from "react-icons/tb"

export const SidebarData = [
    {
        title: "Home",
        path: "/admin",
        icons: <AiIcons.AiFillHome />,
        cName: "nav-text",
    },
    {
        title: 'Categories',
        path: "/admin/categories",
        icons:<BiIcons.BiCategoryAlt/>,
        cName: "nav-text"

    },
    {
        title: 'Subcategories',
        path: "/admin/subcategories",
        icons:<BiIcons.BiCategoryAlt/>,
        cName: "nav-text"
    },
    {
        title: 'Products',
        path: "/admin/products",
        icons:<FaIcons.FaProductHunt/>,
        cName: "nav-text"
    },
    {
        title: 'Coupons',
        path: "/admin/coupons",
        icons:<RiIcons.RiCoupon2Fill/>,
        cName: "nav-text"
    },
    {
        title: 'Promotions',
        path: "/admin/promotions",
        icons: <TbIcons.TbShoppingCartDiscount/>,
        cName: "nav-text"
    },
    {
        title: 'Orders',
        path: "/admin/orders",
        icons:<AiIcons.AiOutlineShoppingCart/>,
        cName: "nav-text"
    },
    {
        title: 'Users',
        path: "/admin/users",
        icons:<AiIcons.AiOutlineUser/>,
        cName: "nav-text"
    }

]