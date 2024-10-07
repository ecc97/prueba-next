"use client";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import axios from "axios";
import { Product } from "@/interface/IProducts";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import Button from "@/components/ui/Button.ui";
import SelectLanguage from "@/components/SelectLanguage/SelectLanguage";
import { useTranslations } from "next-intl";
import Link from "next/link";

const ProductDetails = ({ params }: { params: { id: string } }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session, status } = useSession();
  const router = useRouter();
  const t = useTranslations("ProductPageView");

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  useEffect(() => {
    const getProduct = async (id: string) => {
      if (status === "unauthenticated") {
        router.push("/login");
        return;
      }

      if (status !== "authenticated") {
        return;
      }

      try {
        const response = await axios.get(`/api/routes/products/${id}`, {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        });
        setProduct(response.data);
      } catch (error) {
        console.error("Error al obtener el producto:", error);
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          setError("No autorizado. Por favor, inicie sesión nuevamente.");
          router.push("/login");
        } else {
          setError(
            "Error al obtener el producto. Por favor, intente nuevamente."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") {
      getProduct(params.id);
    }
  }, [params.id, session, status, router]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <p>No se encontró el producto.</p>;
  }

  return (
    <div>
      <Navbar>
        <h1>{t("title")}</h1>
        <div>
          {status === "authenticated" ? (
            <Button type="button" onClick={handleSignOut}>
              {t("logoutButton")}
            </Button>
          ) : (
            <Button type="button" onClick={() => router.push("/login")}>
              {t("loginButton")}
            </Button>
          )}
          <Link href='/products'>{t("productsTitle")}</Link>
          <SelectLanguage />
        </div>
      </Navbar>
      <h1>{product.title}</h1>
      <img src={product.image} alt={product!.title} />
      <p>{product.description}</p>
      <p>
        <strong>Category:</strong> {product.category}
      </p>
      <p>
        <strong>Price:</strong> ${product.price}
      </p>
    </div>
  );
};

export default ProductDetails;
