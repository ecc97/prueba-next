import React from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/features/cart/CartSlice";
import { Product } from "@/interface/IProducts";
import { Card, Image, Title, Price, ButtonAddCart, ButtonDetails } from "./StyledProductCard";
import Link from "next/link";

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const dispatch = useAppDispatch();
    const { data: session } = useSession();
    
    const handleAddCart = () => {
        if (session) {
            dispatch(addToCart(product));
            // Opcional: Guardar en localStorage
            const cart = JSON.parse(localStorage.getItem("cart") || "[]");
            cart.push(product);
            localStorage.setItem("cart", JSON.stringify(cart));
        } else {
            // Redirigir al login o mostrar un mensaje
            alert("Please log in to add items to your cart");
        }
    };

    return (
        <Card>
            <Image src={product.image} alt={product.title} />
            <Title>{product.title}</Title>
            <Price>${product.price}</Price>
            <ButtonAddCart onClick={handleAddCart}>Add to Cart</ButtonAddCart>
            <Link href={`/details/${product.id}`} passHref>
                <ButtonDetails>Ver detalles</ButtonDetails>
            </Link>
        </Card>
    );
};

export default ProductCard;