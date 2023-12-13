import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import OrderPage from './pages/OrderPage';
import AccountPage from './pages/AccountPage';
import SingleProduct from "./components/SingleProduct/SingleProduct"

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/order" element={<OrderPage />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/single" element={<SingleProduct />} />
            </Routes>
        </Router>
    );
};

export default App;




