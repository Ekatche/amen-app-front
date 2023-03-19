import { Link } from "react-router-dom";
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import { navItems } from "../../Sidebar/NavbarItems";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Offcanvas from "react-bootstrap/Offcanvas";
import SingninButton, { LogoutButton, LoginButton } from "../../Sidebar/Button";
import { FaBars } from "react-icons/fa";
import "./Navbar.css";
import amenlogo from "./../../../logo/logo_without_background_192.png";
import SubMenu from "../Submenu";
import { BsFillPersonFill } from "react-icons/bs";
import { AiFillShopping } from "react-icons/ai";
// mui material
import Badge from "@mui/material/Badge";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";

const CustomNavbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const [sidebar, setSidebar] = useState(false);
  const [mobile, setMobile] = useState(false);

  const handleClose = () => setSidebar(false);
  const handleShow = () => setSidebar(true);

  const Navigate = useNavigate();

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

  return (
    <div className="sticky-top sticky-top-static">
      <nav className="navbar-client">
        {mobile ? (
          <div className="mobile-header">
            <div className="header-top">
              <div className="top-left">
                <label className="mobile-nav">
                  <FaBars
                    className={"sidebar-toggle-logo"}
                    onClick={handleShow}
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
                <Form className="d-flex ">
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
                <div className="hearder-item">
                  <Badge>
                    <a href="/">
                      <BsFillPersonFill />
                    </a>
                  </Badge>
                </div>
                <div className="hearder-item">
                  <Badge
                    className="hearder-item"
                    badgeContent={10}
                    color="error"
                  >
                    <a href="/">
                      <AiFillShopping />
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
                    <ul className={eachItems.sName}>
                      <span className={"sidebar-title"}>{eachItems.title}</span>
                      {eachItems.items.map((items) => {
                        return <SubMenu item={items} />;
                      })}
                    </ul>
                  ))}
                </div>
                {user ? <LogoutButton /> : ""}
              </Offcanvas.Body>
            </Offcanvas>
          </div>
        ) : (
          <>
            <Link
              to="/"
              className="navbar-logo"
              onClick={() => setSidebar(false)}
            >
              <img alt="amenlogo" src={amenlogo} className="amen-logo"></img>
            </Link>
            <Form className="d-flex justify-content-center col-8">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
            <div className="top-right col-1">
              <div>
                <a href="/">
                  <BsFillPersonFill />
                </a>
              </div>
              <div>
                <a href="/">
                  <AiFillShopping />
                </a>
              </div>
            </div>
            <div className="row">
              <ul className="nav-items">
                {navItems.map((items) => {
                  return (
                    <li key={items.id} className={items.nName}>
                      <a href={items.path}>
                        {items.icon}
                        <span>{items.title}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
            {user ? (
              <LogoutButton />
            ) : (
              <ButtonGroup className="navbar-btn">
                <SingninButton />
                <LoginButton />
              </ButtonGroup>
            )}
          </>
        )}
      </nav>
    </div>
  );
};

export default CustomNavbar;
