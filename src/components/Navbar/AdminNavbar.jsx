import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { SidebarData } from "../Sidebar/AdminSideBar";
import { IconContext } from "react-icons";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import "./AdminNavBar.css"


function AdminNavBar() {

  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const { user, logoubackofficetUser } = useContext(AuthContext);

  return (
    <>
      <IconContext.Provider value={{ color: "undefined" }}>
        <div className="navbar">

          <NavLink to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </NavLink>
          <h1 className="menu-text"> Amen Admin Page</h1>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <NavLink to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </NavLink>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <NavLink to={item.path}>
                    {item.icons}
                    <span>{item.title}</span>
                  </NavLink>
                </li>
              )
            }
            )
            }
            {user ?
              <li className="nav-text">
                <NavLink onClick={logoubackofficetUser}>
                  <AiIcons.AiOutlineLogout />
                  <span> Logout </span>
                </NavLink>
              </li>
              :
              <li className="nav-text">
                <NavLink to="/admin/login">
                  <AiIcons.AiOutlineLogin />
                  <span> Login </span>
                </NavLink>
              </li>
            }

          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default AdminNavBar;
