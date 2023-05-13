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
        title: "Me connecter / M'inscrire",
        path: "./login",
        cName: "side-items",
        icon: <BsPerson size={"25px"} />,
        subNav: false,
      },
      {
        id: 2,
        title: "Favoris",
        path: "./",
        cName: "side-items",
        icon: <AiOutlineHeart size={"25px"} />,
        subNav: false,
      },
      {
        id: 3,
        title: "Mes commandes",
        path: "./",
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
        id: 1,
        title: "Parfum femme",
        path: "./",
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
        id: 2,
        title: "Parfum homme",
        path: "./",
        cName: "side-items",
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
          {
            id: 1,
            title: "Parfum Masculins",
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
        id: 3,
        title: "Parfum enfants",
        path: "./",
        cName: "side-items",
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
          { id: 1, title: "Fille", cName: "subnav-items", path: "/", icon: "" },
          {
            id: 2,
            title: "Garçon",
            cName: "subnav-items",
            path: "/",
            icon: "",
          },
          { id: 3, title: "Bébé", cName: "subnav-items", path: "/", icon: "" },
          {
            id: 4,
            title: "Nouveautés",
            cName: "subnav-items",
            path: "/",
            icon: "",
          },
        ],
      },
      {
        id: 4,
        title: "Coffrets",
        path: "./",
        cName: "side-items",
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
          {
            id:1,
            title: "Coffret Femme",
            path: "/",
            cName: "subnav-items",
            icon: "",
          },
          {
            id:2,
            title: "Coffret Homme",
            path: "/",
            cName: "subnav-items",
            icon: "",
          },
          {
            id:3,
            title: "Coffret Enfant",
            path: "/",
            cName: "subnav-items",
            icon: "",
          },
        ],
      },
      {
        id: 5,
        title: "Promotion",
        path: "./",
        cName: "side-items",
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
          {
            id:1,
            title: "Promotions hommes",
            path: "/",
            cName: "subnav-items",
            icon: "",
          },
          {
            id:2,
            title: "Promotions femmes",
            path: "/",
            cName: "subnav-items",
            icon: "",
          },
          {
            id:3,
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
        id: 1,
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
