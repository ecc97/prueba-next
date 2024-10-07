import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Product } from '@/interface/IProducts';
import { ProductsContainer } from './StyledProduct';
import ProductCard from '../ProductCard/ProductCard';


const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const getProducts = async () => {
            const response = await axios.get('/api/routes/products');
            const data = await response.data;
            setProducts(data);
        };

        getProducts();
    }, []);

    return (
        <div>
            <h1>Productos</h1>
            <ProductsContainer>
                {products.map(product => (
                    <ProductCard 
                    key={product.id} 
                    product={product}
                  />
                ))}
            </ProductsContainer>
        </div>
    );
};

export default Products;
