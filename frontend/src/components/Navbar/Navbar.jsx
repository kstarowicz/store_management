import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-nav">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/cart">Cart</Link></li>
                <li><Link to="/order">Order</Link></li>
                <li><Link to="/account">Account</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
