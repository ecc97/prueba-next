import { NextRequest, NextResponse } from "next/server";
import { urlApi } from "../../ApiUrl";

export async function GET() {
    try {
        const response = await fetch(`${urlApi}/auth/products`);
        const data = await response.json();
        
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ message: "Error al obtener los productos." }, { status: 500});
    }
}