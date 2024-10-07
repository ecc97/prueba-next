"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import Form from "../Form/Form";
import Input from "../ui/Input.ui";
import Button from "../ui/Button.ui";
import { StyleContainer } from "./StyleRegister";

interface UserRegister {
  email: string;
  username: string;
  password: string;
  name: string;
  phone: string;
}

const initialStateRegister: UserRegister = {
  email: "",
  username: "",
  password: "",
  name: "",
  phone: "",
};

export default function RegisterFormContainer() {
  const traduction = useTranslations("RegisterView");
  const router = useRouter();
  const [registerState, setRegisterState] = React.useState<UserRegister>(initialStateRegister);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerState),
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error al registrar la cuenta");
      }
  
      const data = await res.json();
      console.log(data);
  
      
      router.push("/login");
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyleContainer>
      <Form onSubmit={handleRegister}>
        <Input
          type="email"
          name="email"
          placeholder={traduction("email")}
          value={registerState.email}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="username"
          placeholder={traduction("password")}
          value={registerState.username}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="name"
          placeholder={traduction("name")}
          value={registerState.name}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password"
          placeholder={traduction("password")}
          value={registerState.password}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="phone"
          placeholder={traduction("phone")}
          value={registerState.phone}
          onChange={handleChange}
        />
        <Button type="submit">{traduction("buttonRegister")}</Button>
        {loading && <p>{traduction("loading")}</p>}
        {error && <p className="error text-red-500">{error}</p>}
        <div>
          {traduction("text")}{" "}
          <Link href="/login">{traduction("linkLogin")}</Link>
        </div>
      </Form>
    </StyleContainer>
  );
}
