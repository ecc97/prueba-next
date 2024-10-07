"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { signIn, useSession } from "next-auth/react";
// import { getSession } from "next-auth/react";
import { StyleContainer } from "./styledLogin";
import { Form } from "@/components";
import Input from "@/components/ui/Input.ui";
import Button from "@/components/ui/Button.ui";

interface UserLogin {
  username: string;
  password: string;
}

const initialLoginState: UserLogin = {
  username: "",
  password: "",
};

export default function LoginFormContainer() {
  const traduction = useTranslations("LoginView");
  const { status, data: session } = useSession();
  const router = useRouter();
  const [loginState, setLoginState] = React.useState<UserLogin>(initialLoginState);
  const [error, setError] = React.useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginState({ ...loginState, [name]: value });
  };

  React.useEffect(() => {
    if (status === "authenticated") {
      router.push("/products");
    }
  }, [status, session, router]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      console.log("Attempting to sign in with:", loginState);
      const result = await signIn("credentials", {
        redirect: false,
        username: loginState.username,
        password: loginState.password,
      });

      console.log(result);

      if (result?.error) {
        setError(result.error);
      } else {
        setLoginState(initialLoginState);
        setError(null);
        router.push("/products");
      }
    } catch (error) {
      console.error("Error during sign in:", error);
      setError("Hubo un error iniciando sesión.");
      setLoginState(initialLoginState);
    }
  };

  return (
    <StyleContainer>
      <Form onSubmit={handleLogin}>
        <Input
          type="text"
          name="username"
          placeholder={traduction("username")}
          value={loginState.username}
          onChange={handleInputChange}
        />
        <Input
          type="password"
          name="password"
          placeholder={traduction("password")}
          value={loginState.password}
          onChange={handleInputChange}
        />
        <Button type="submit">{traduction("buttonLogin")}</Button>
      </Form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        {traduction("text")}{" "}
        <Link href="/register">{traduction("linkRegister")}</Link>
      </div>
    </StyleContainer>
  );
}