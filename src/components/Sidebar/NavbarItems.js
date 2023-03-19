import * as Icons from "react-icons/fa";
import { TfiPackage } from "react-icons/tfi";
import { BsPersonFillCheck, BsFillPersonFill } from "react-icons/bs";
import { BiHelpCircle } from "react-icons/bi";
import * as RiIcons from "react-icons/ri";

export const navItems = [
  {
    id: 1,
    title: "Compte",
    path: "./",
    nName: "nav-item",
    sName: "sidebar-item",
    icon: <BsFillPersonFill />,
    items: [
      {
        id: 1,
        title: "Me connecter / M'inscrire",
        path: "./login",
        cName: "side-items",
        icon: <BsPersonFillCheck />,
        subNav: false,
      },
      {
        id: 2,
        title: "Favoris",
        path: "./",
        cName: "side-items",
        icon: <Icons.FaHeart />,
        subNav: false,
      },
      {
        id: 3,
        title: "Mes commandes",
        path: "./",
        cName: "side-items",
        icon: <TfiPackage />,
        subNav: false,
      },
    ],
  },
  {
    id: 2,
    title: "Categories ",
    path: "./services",
    nName: "nav-item",
    sName: "sidebar-item",
    icon: <Icons.FaBriefcase />,
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
            title: "Coffret Femme",
            path: "/",
            cName: "subnav-items",
            icon: "",
          },
          {
            title: "Coffret Homme",
            path: "/",
            cName: "subnav-items",
            icon: "",
          },
          {
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
            title: "Promotions hommes",
            path: "/",
            cName: "subnav-items",
            icon: "",
          },
          {
            title: "Promotions femmes",
            path: "/",
            cName: "subnav-items",
            icon: "",
          },
          {
            title: "Promotions Enfant",
            path: "/",
            cName: "subnav-items",
            icon: "",
          },
        ]
      }
    ],
  },
  {
    id: 3,
    title: "Autres",
    path: "./products",
    nName: "nav-item",
    sName: "sidebar-item",
    icon: <Icons.FaCartArrowDown />,
    items: [
      {
        id: 1,
        title: "Aide et contact",
        path: "./",
        cName: "side-items",
        icon: <BiHelpCircle />,
        subNav: false,
      },
    ],
  },
];

export const sideItems = [{}];
