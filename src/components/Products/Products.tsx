import React, { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "@/interface/IProducts";
import { ProductsContainer } from "./StyledProduct";
import ProductCard from "../ProductCard/ProductCard";
import { useTranslations } from "next-intl";

interface ProductProps {
  token: string;
}

const Products: React.FC<ProductProps> = ({ token }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const t = useTranslations("ProductPageView");


  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get("http://192.168.88.39:7000/auth/products", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Error al obtener los productos");
      }
    };

    if (token) getProducts();
  }, [token]);

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>{t("productsTitle")}</h1>
      <ProductsContainer>
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No hay productos disponibles.</p>
        )}
      </ProductsContainer>
    </div>
  );
};

export default Products;