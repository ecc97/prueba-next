
import { useSession, signIn } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { addToCart } from "@/redux/features/cart/CartSlice";
import { Product } from "@/interface/IProducts";
import { Card, Image, Title, Price, ButtonAddCart, ButtonDetails } from "./StyledProductCard";
import Link from "next/link";

interface ProductCardProps {
    product: Product
}

interface CardProps {
    title: string;
    price: string;
    image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { data: session } = useSession()
    const dispatch = useAppDispatch();

    // const handleAddCart = () => {
    //     if (!session) return signIn();

    //     const productOfUser = {
    //         ...product,
    //         idUser: session.user.id,
    //     }

    //     dispatch(addToCart(productOfUser));

    // };
    return (
        <Card>
            <Image src={product.image} alt={product.title} />
            <Title>{product.title}</Title>
            <Price>${product.price}</Price>
            <ButtonAddCart >Add to Cart</ButtonAddCart>
            <Link href={`/details/${product.id}`} passHref>
                <ButtonDetails>Ver detalles</ButtonDetails>
            </Link>
        </Card>
    );
};

export default ProductCard;