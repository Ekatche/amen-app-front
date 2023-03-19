import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Submenu.css"

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
          item.subNav.map((item, index) => {
            return (
              <Link to={item.path} key={index} className={item.cName}>
                {item.icon}
                <span>{item.title}</span>
              </Link>
            );
          })}
    </>
  );
};

export default SubMenu;
