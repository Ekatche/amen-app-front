import { Link } from "react-router-dom";
import React, { useContext, useState, useEffect, useId } from "react";
import { useNavigate  } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Offcanvas from "react-bootstrap/Offcanvas";
import { LogoutButton, LoginButton, AccountButton } from "../../Sidebar/Button";
// nav items
import { navItems } from "../NavbarItems";

import "./Navbar.css";
import amenlogo from "./../../../logo/logo_without_background_192.png";
import SubMenu, { DeskSubNav } from "../Submenu";
// icons
import { FaBars } from "react-icons/fa";
import { BsPerson } from "react-icons/bs";
import { AiOutlineHeart, AiOutlineShopping } from "react-icons/ai";
// mui material
import Badge from "@mui/material/Badge";

const CustomNavbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const [sidebar, setSidebar] = useState(false);
  const [mobile, setMobile] = useState(false);

  const handleClose = () => setSidebar(false);
  const handleShow = () => setSidebar(true);



  useEffect(() => {
    if (window.innerWidth < 1065) {
      setMobile(true);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1065) {
        setMobile(true);
      } else {
        setMobile(false);
        setSidebar(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [hovered, setHovered] = useState(false);
  const toggleHover = () => setHovered(!hovered);

  return (
    <>
      {mobile ? (
        /* ~~~~~~MOBILE HEADER ~~~~~~*/
        <header className="navbar-client">
          <div className="mobile-header">
            <div className="header-top">
              <div className="top-left">
                <label className="mobile-nav">
                  <FaBars
                    className={"sidebar-toggle-logo"}
                    onClick={handleShow}
                    size={"30px"}
                  />
                </label>
                <Link
                  to="/"
                  className="navbar-logo"
                  onClick={() => setSidebar(false)}
                >
                  <img
                    alt="amenlogo"
                    src={amenlogo}
                    className="amen-logo"
                  ></img>
                </Link>
              </div>
              <div className="top-center">
                <Form className="d-flex header-search">
                  <Form.Control
                    type="search"
                    placeholder="Recherchez un produit"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form>
              </div>
              <div className="top-right">
                <div className="mobile-header-item">
                  <Badge>
                  {
                    user ? 
                    <a href="/account">
                      <BsPerson size={"30px"} />
                    </a>:
                    <a href="/login">
                      <BsPerson size={"30px"} />
                    </a>
                  }
                    
                  </Badge>
                </div>
                <div className="mobile-header-item">
                  <Badge badgeContent={10} color="error">
                    <a href="/">
                      <AiOutlineHeart size={"30px"} />
                    </a>
                  </Badge>
                </div>
                <div className="mobile-header-item">
                  <Badge badgeContent={10} color="error">
                    <a href="/">
                      <AiOutlineShopping size={"30px"} />
                    </a>
                  </Badge>
                </div>
              </div>
            </div>
            <Offcanvas show={sidebar} onHide={handleClose}>
              <Offcanvas.Header closeButton>
                <Offcanvas.Title className="sidebar-amen">
                  Amen Fragrance
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <div>
                  {navItems.map((eachItems) => (
                    <ul
                      key={eachItems.title}
                      className={eachItems.sName}
                      href={eachItems.path}
                    >
                      <span className={"sidebar-title"} href={eachItems.path}>
                        {eachItems.title}
                      </span>
                      {eachItems.items.map((items) => {
                        return <SubMenu item={items} key={items.title} />;
                      })}
                    </ul>
                  ))}
                </div>
                {user ? (
                  <ButtonGroup className="navbar-btn">
                    <LogoutButton />
                  </ButtonGroup>
                ) : (
                  ""
                )}
              </Offcanvas.Body>
            </Offcanvas>
          </div>
        </header>
      ) : (
        /* ~~~~~~ DESKTOP HEADER ~~~~~~ */
        <>
          <header className="navbar-client">
            <div className="desktop-header container">
              <div className="search-wrapper">
                <div className="header-item">
                  <Link
                    to="/"
                    className="navbar-logo"
                    onClick={() => setSidebar(false)}
                  >
                    <img
                      alt="amenlogo"
                      src={amenlogo}
                      className="amen-logo"
                    ></img>
                  </Link>
                  <span> Amen Fragrance </span>
                </div>
                <div className="header-search">
                  <Form className="d-flex">
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      className="me-2"
                      aria-label="Search"
                    />
                    <Button variant="outline-success">Search</Button>
                  </Form>
                </div>
              </div>
              <div className="header-links">
                <div className="header-item">
                  <Badge
                    className="hearder-item"
                    badgeContent={10}
                    color="error"
                  >
                    <a href="/">
                      <AiOutlineHeart size={"30px"} />
                    </a>
                  </Badge>
                </div>
                <div className="header-item">
                  <Badge
                    className="hearder-item"
                    badgeContent={10}
                    color="error"
                  >
                    <a href="/">
                      <AiOutlineShopping size={"30px"} />
                    </a>
                  </Badge>
                </div>
                <div className="header-item">
                  {user ? (
                    <ButtonGroup className="navbar-btn">
                      <LogoutButton logoutUser={logoutUser} />
                      <AccountButton />
                    </ButtonGroup>
                  ) : (
                    <ButtonGroup className="navbar-btn">
                      <LoginButton />
                    </ButtonGroup>
                  )}
                </div>
              </div>
            </div>
          </header>
          <div className="container">
            <nav id="nav5" className="main-nav text-center">
              <ul className="global-nav menu dropdown">
                {navItems.map((cat) => {
                  if (cat.title === "Categories") {
                    return cat.items.map((subcat) => {
                      return (
                        <li key={subcat.title}>
                          <a href={subcat.path} className={"hover-item-li"}>
                            {subcat.title}
                          </a>
                          <ul
                            key={subcat.id}
                            className={"subnav-content is-dropdown-submenu "}
                          >
                            <DeskSubNav item={subcat} />
                          </ul>
                        </li>
                      );
                    });
                  }
                })}
              </ul>
            </nav>
          </div>
        </>
      )}
    </>
  );
};

export default CustomNavbar;
