import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getUsers, addUser } from "@/utils/users";

// let users = [
//     { id: "1", email: "test@example.com", passwordHash: bcrypt.hashSync("password123", 10), language: "es", token: "my-token-fake-123" },
// ]

const users = getUsers()

export async function POST(req: Response) {
    const { username, email, password } = await req.json();

    // Verificar si el usuario ya existe
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
        return NextResponse.json({ message: "El usuario ya existe." }, { status: 400 });
    }

    // Generar un hash para la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario
    const newUser = {
        id: (users.length + 1).toString(),
        username,
        email,
        passwordHash: hashedPassword,
        language: "es",
        token: `fake-token-${Math.random().toString(36).substr(2)}`,
    };

    // Añadir el nuevo usuario a la lista
    addUser(newUser);
    return NextResponse.json( {message: "Usuario registrado existosamente"}, { status: 201 });
}