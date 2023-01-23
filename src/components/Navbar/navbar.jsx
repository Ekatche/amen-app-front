import React, {useContext, useState} from "react";
import AuthContext from "../../context/AuthContext"
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from 'reactstrap';

function NavBarHome(args) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const {user, logoutUser} = useContext(AuthContext);

    return (
        <div>
            <Navbar>
                <NavbarBrand href="/">Amen Cosmetics</NavbarBrand>
                <NavbarToggler onClick={toggle} className="me-2"/>
                <Collapse isOpen={isOpen} navbar>

                    {user ?
                        (
                            <Nav className="me-auto" navbar>
                                <NavItem>
                                    <NavLink href="/">
                                        Home
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/register">
                                        Register
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="#" onClick={logoutUser}>
                                        logout
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        ) :
                        (
                            <Nav className="me-auto" navbar>
                                <NavItem>
                                    <NavLink href="/">
                                        Home
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/register">
                                        Register
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/login/">
                                        Login
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        )
                    }
                </Collapse>
            </Navbar>
        </div>

    )
}

export default NavBarHome;