'use client'
import React from "react"
import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { useAppSelector, useAppDispatch} from "@/redux/hooks"
import { removeFromCart, setCart } from "@/redux/features/cart/CartSlice"
import { ProductsContainer } from "@/components/Products/StyledProduct"
import ProductCard from "@/components/ProductCard/ProductCard"



const CartPage = () => {
    const { data: session } = useSession()
    const dispatch = useAppDispatch()
    const cartItems = useAppSelector((state) => state.cart.products)
    const filteredCartItems = cartItems.filter(item => item.idUser === session?.user.id)
    
    const handleRemoveFromCart = (id: number) => {
        dispatch(removeFromCart(id))
    }

    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
          dispatch(setCart(JSON.parse(savedCart)));
        }
      }, [dispatch]);

    return (
        <div>
            <h1>Carrito de compras</h1>
            {filteredCartItems.length === 0? (
                <p>Tu carrito está vacío.</p>
            ) : (
                <ProductsContainer>
                    {filteredCartItems.map((item) => (
                        <div>
                            <ProductCard 
                            key={item.id} 
                            product={item} 
                        />
                            <button onClick={() => handleRemoveFromCart(item.id)}>Quitar</button>
                        </div>
                    ))}
                </ProductsContainer>
            )}
        </div>
    )
}

export default CartPage