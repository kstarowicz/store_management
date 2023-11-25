import React, { useEffect, useState } from 'react';
import './Products.scss';

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Pobranie produktów z API
        fetch('/api/products')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div className="products">
            {products.map(product => (
                <div key={product.id} className="product">
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                </div>
            ))}
        </div>
    );
};

export default Products;
