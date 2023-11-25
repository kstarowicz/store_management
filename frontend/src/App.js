//import logo from './logo.svg';
import './App.css';

import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Products from './components/Products/Products';


const App = () => {
    return (
        <div className="App">
            <Navbar />
            <Products />
            {/* komponentyj */ }
       </div>
    );
};

export default App;



