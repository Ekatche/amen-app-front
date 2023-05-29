import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Submenu.css";

const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);
  return (
    <>
      <Link to={item.path} onClick={item.subNav && showSubnav}>
        <div>
          {item.icon}
          <span>{item.title}</span>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </Link>
      {!item.subNav
        ? ""
        : subnav &&
          item.subNav.map((item) => {
            return (
              <Link to={item.path} key={item.title} className={item.cName}>
                {item.icon}
                <span>{item.title}</span>
              </Link>
            );
          })}
    </>
  );
};

export default SubMenu;

const DeskSubNav = ({ item }) => {
  return (
    <>
      {item.subNav.map((subnav) => {
        return (
          <div key={subnav.id} className="nav-level-3-wrapper">
            <a href={subnav.path}>{subnav.title}</a>
          </div>
        );
      })}
    </>
  );
};

export { DeskSubNav };
