import React from 'react';
import './Navbar.scss';

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-nav">
                <li>Home</li>
                <li>Products</li>
                <li>About</li>
            </ul>
        </nav>
    );
};

export default Navbar;