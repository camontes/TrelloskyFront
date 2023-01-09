import React from "react";
import {Navbar, NavbarBrand} from 'reactstrap';

const Header = () => {

    return(
        <>
        <Navbar
                className="my-2"
                color="info"
                dark
            >
                <NavbarBrand href="/">
                    Trellosky
                </NavbarBrand>
        </Navbar>
        </>
    );
}

export default Header;