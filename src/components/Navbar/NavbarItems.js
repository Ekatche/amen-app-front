import { TfiPackage } from "react-icons/tfi";
import { BiHelpCircle } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import * as RiIcons from "react-icons/ri";


export const navItems = [
  
  {
    id: 1,
    title: "Compte",
    path: "./",
    nName: "nav-item",
    sName: "sidebar-item",
    items: [
      {
        id: 1,
        title: "Mon Compte",
        path: "/account",
        cName: "side-items",
        icon: <BsPerson size={"25px"} />,
        subNav: false,
      },
      {
        id: 2,
        title: "Favoris",
        path: "/",
        cName: "side-items",
        icon: <AiOutlineHeart size={"25px"} />,
        subNav: false,
      },
      {
        id: 3,
        title: "Mes commandes",
        path: "/",
        cName: "side-items",
        icon: <TfiPackage size={"23px"} />,
        subNav: false,
      },
    ],
  },
  {
    id: 2,
    title: "Categories",
    path: "./services",
    nName: "nav-item",
    sName: "sidebar-item",
    items: [
      {
        id: 4,
        title: "Parfum femme",
        path: "/femme",
        cName: "side-items",
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
          {
            id: 1,
            title: "Parfum féminin",
            cName: "subnav-items",
            path: "/",
            icon: "",
          },
          {
            id: 2,
            title: "Déodorant",
            cName: "subnav-items",
            path: "/",
            icon: "",
          },
          {
            id: 3,
            title: "Nouveautés",
            cName: "subnav-items",
            path: "/",
            icon: "",
          },
        ],
      },
      {
        id: 5,
        title: "Parfum homme",
        path: "/homme",
        cName: "side-items",
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
          {
            id: 4,
            title: "Parfum Masculins",
            cName: "subnav-items",
            path: "/",
            icon: "",
          },
          {
            id: 5,
            title: "Déodorant",
            cName: "subnav-items",
            path: "/",
            icon: "",
          },
          {
            id: 6,
            title: "Nouveautés",
            cName: "subnav-items",
            path: "/",
            icon: "",
          },
        ],
      },
      {
        id: 6,
        title: "Parfum enfants",
        path: "/enfant",
        cName: "side-items",
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
          { id: 7, title: "Fille", cName: "subnav-items", path: "/", icon: "" },
          {
            id: 8,
            title: "Garçon",
            cName: "subnav-items",
            path: "/",
            icon: "",
          },
          { id: 9, title: "Bébé", cName: "subnav-items", path: "/", icon: "" },
          {
            id: 10,
            title: "Nouveautés",
            cName: "subnav-items",
            path: "/",
            icon: "",
          },
        ],
      },
      {
        id: 7,
        title: "Coffrets",
        path: "./",
        cName: "side-items",
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
          {
            id:11,
            title: "Coffret Femme",
            path: "/",
            cName: "subnav-items",
            icon: "",
          },
          {
            id:12,
            title: "Coffret Homme",
            path: "/",
            cName: "subnav-items",
            icon: "",
          },
          {
            id:13,
            title: "Coffret Enfant",
            path: "/",
            cName: "subnav-items",
            icon: "",
          },
        ],
      },
      {
        id: 8,
        title: "Promotion",
        path: "./",
        cName: "side-items",
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
          {
            id:14,
            title: "Promotions hommes",
            path: "/",
            cName: "subnav-items",
            icon: "",
          },
          {
            id:15,
            title: "Promotions femmes",
            path: "/",
            cName: "subnav-items",
            icon: "",
          },
          {
            id:16,
            title: "Promotions Enfant",
            path: "/",
            cName: "subnav-items",
            icon: "",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Autres",
    path: "./products",
    nName: "nav-item",
    sName: "sidebar-item",
    items: [
      {
        id: 9,
        title: "Aide et contact",
        path: "./",
        cName: "side-items",
        icon: <BiHelpCircle size={"25px"} />,
        subNav: false,
      },
    ],
  },
];

export const sideItems = [{}];
