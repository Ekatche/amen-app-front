import { useContext } from "react";
import AuthContext from "../../context/AuthContext"
import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';

function NavBar(args) {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const { user, logoutUser } = useContext(AuthContext);

    return (
        <div>
            <Navbar>
                <NavbarBrand href="/">Amen Cosmetics</NavbarBrand>
                <NavbarToggler onClick={toggle} />
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
                                    <NavLink onClick={logoutUser}>
                                        LogOut
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
                                <NavItem>
                                    <NavLink href="/admin/login">
                                        Admin Panel
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        )
                    }
                </Collapse>
            </Navbar>
        </div>
    )

};

export default NavBar;