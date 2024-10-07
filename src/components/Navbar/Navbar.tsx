"use client"
import React from "react";
import { StyleNavbar } from "./StyledNavbar";

interface NavbarProps {
    children: React.ReactNode
}

const Navbar: React.FC<NavbarProps> = ({children}) => {
    
    return (
        <StyleNavbar>
            {children}
        </StyleNavbar>
    );
}

export default Navbar;