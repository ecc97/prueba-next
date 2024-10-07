import { NextResponse } from "next/server";
import { urlApi } from "../../ApiUrl";


export async function POST(req: Request) {
    const { email, username, password, name, phone } = await req.json();
  
    const newUser = {
      username,
      email,
      password,
      name,
      phone,
    };
  
    try {
      const response = await fetch(`${urlApi}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        return NextResponse.json({ message: errorData.message || "Error al registrar la cuenta" }, { status: 400 });
      }
  
      // Devuelve los datos del usuario registrado (o lo que la API retorne)
      const userData = await response.json();
      return NextResponse.json({ message: "Usuario registrado exitosamente", userData }, { status: 201 });
    } catch (error) {
      console.error("Error en el registro:", error);
      return NextResponse.json({ message: "Error en el registro de usuario" }, { status: 500 });
    }
  }