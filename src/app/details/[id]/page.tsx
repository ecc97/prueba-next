"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import { Product } from "@/interface/IProducts";

const ProductDetails = ({ params }: { params: { id: string } }) => {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getProduct = async (id: string) => {
            try {
                const response = await axios.get(`/api/routes/products/${id}`);
                const data = await response.data; 
                setProduct(data);

            } catch (error) {
                console.error("Error al obtener el producto:", error);
                return null; 
            } finally {
                setLoading(false);
            }
        };

        getProduct(params.id);
    }, [params.id]);

    if (loading) {
        return <p>Cargando...</p>; // Muestra un mensaje mientras se cargan los datos
    }

    if (!product) {
        return <p>No se encontró el producto.</p>; // Muestra este mensaje si no se encontró el producto
    }
    

    return (
        <div>
            <h1>{product.title}</h1>
            <img src={product.image} alt={product!.title} />
            <p>{product.description}</p>
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Price:</strong> ${product.price}</p>
        </div>
    );
};

export default ProductDetails;