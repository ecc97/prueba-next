'use client'
import React, { useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useAppSelector, useAppDispatch } from "@/redux/hooks"
import { removeFromCart, setCart } from "@/redux/features/cart/CartSlice"
import { ProductsContainer } from "@/components/Products/StyledProduct"
import ProductCard from "@/components/ProductCard/ProductCard"

const CartPage = () => {
    const { data: session, status } = useSession()
    const dispatch = useAppDispatch()
    const router = useRouter()
    const cartItems = useAppSelector((state) => state.cart.products)
    
    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login")
        }
    }, [status, router])

    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            dispatch(setCart(JSON.parse(savedCart)));
        }
    }, [dispatch]);

    const handleRemoveFromCart = (id: number) => {
        dispatch(removeFromCart(id))
        // Actualizar localStorage
        const updatedCart = cartItems.filter(item => item.id !== id);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    }

    if (status === "loading") return <div>Loading...</div>
    if (!session) return null

    return (
        <div>
            <h1>Carrito de compras</h1>
            {cartItems.length === 0 ? (
                <p>Tu carrito está vacío.</p>
            ) : (
                <ProductsContainer>
                    {cartItems.map((item) => (
                        <div key={item.id}>
                            <ProductCard product={item} />
                            <button onClick={() => handleRemoveFromCart(item.id)}>Quitar</button>
                        </div>
                    ))}
                </ProductsContainer>
            )}
        </div>
    )
}

export default CartPage