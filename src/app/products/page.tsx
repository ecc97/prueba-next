"use client"
import { useSession, signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar"
import Button from "@/components/ui/Button.ui";


function ProductPage() {
    const { status, data: session } = useSession();
    const t = useTranslations("HomePageView")
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut({ redirect: false});
        router.push("/login");
    }

    return (
        <div>
            <Navbar>
                <h1>store</h1>
                {status === "authenticated" ? (
                <Button type="button" onClick={handleSignOut}>
                    {t("logoutButton")}
                </Button>
            ) : null}
            </Navbar>
        </div>
    )
}

export default ProductPage
