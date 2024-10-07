import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { urlApi } from "../../ApiUrl";


export async function POST(req: Response) {
    const { email, username, password, name, phone } = await req.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario
    const newUser = {
        username,
        email,
        passwordHash: hashedPassword,
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
        })

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error al registrar la cuenta");
        }
    
        return NextResponse.json( {message: "Usuario registrado existosamente"}, { status: 201 });
    } catch (error) {
        console.error(error)
    }
}