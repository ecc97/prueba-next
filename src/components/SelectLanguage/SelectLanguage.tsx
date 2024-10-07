"use client"
import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function SelectLanguage():React.ReactElement {
    const router = useRouter();
    const handleSelectLanguage = (e:React.ChangeEvent<HTMLSelectElement>):void => {
        Cookies.set("locale", e.currentTarget.value);
        router.refresh();
    };

    return (
        <div>
            <select onChange={handleSelectLanguage}>
                <option value="es">Español</option>
                <option value="en">English</option>
            </select>
        </div>
    )
}