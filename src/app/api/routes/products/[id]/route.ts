import { NextRequest, NextResponse } from "next/server";
import { urlApi } from "@/app/api/ApiUrl";
import { getToken } from "next-auth/jwt";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        
        const token = await getToken({ req: request });
        
        if (!token) {
            return NextResponse.json({ message: "No autorizado" }, { status: 401 });
        }

        const response = await fetch(`${urlApi}/auth/products/${id}`, {
            headers: {
                'Authorization': `Bearer ${token.accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            if (response.status === 404) {
                return NextResponse.json({ message: "Producto no encontrado" }, { status: 404 });
            }
            throw new Error(`error: ${response.status}`);
        }

        const data = await response.json();
        
        return NextResponse.json(data);
    } catch (error) {
        console.error("No se puede mostrar el producto:", error);
        return NextResponse.json({ message: "No se puede mostrar el producto." }, { status: 500 });
    }
}