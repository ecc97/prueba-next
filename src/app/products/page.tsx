"use client";
import { useSession, signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import SelectLanguage from "@/components/SelectLanguage/SelectLanguage";
import Button from "@/components/ui/Button.ui";
import Products from "@/components/Products/Products";
// import { useEffect } from "react";

function ProductPage() {
  const { status, data: session } = useSession();
  const t = useTranslations("ProductPageView");
  const router = useRouter();


  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  if (status === "loading") {
    return <div>{t("loading")}</div>;
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
          <SelectLanguage />
        </div>
      </Navbar>

      {status === "authenticated" && session?.accessToken ? (
        <Products token={session.accessToken} />
      ) : (
        <p>No autenticado.</p>
      )}
    </div>
  );
}

export default ProductPage;
