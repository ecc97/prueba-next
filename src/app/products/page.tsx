"use client"
import { useSession, signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar"
import SelectLanguage from "@/components/SelectLanguage/SelectLanguage";
import Button from "@/components/ui/Button.ui";


function ProductPage() {
    const { status, data: session } = useSession();
    const t = useTranslations("ProductPageView")
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut({ redirect: false});
        router.push("/login");
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
                    ) : null}
                    <SelectLanguage />
                </div>
            </Navbar>
        </div>
    )
}

export default ProductPage
