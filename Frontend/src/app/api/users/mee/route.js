import getDataFromToken from "@/helpers/getDataFromToken";
import { NextResponse, NextRequest } from "next/server";


export async function GET(request) {
    try {
        const userData = await getDataFromToken(request);
        console.log(userData);

        return NextResponse.json({
            message: "User Found",
            data: userData, 
            status: 200
    });
    } catch (error) {
        return NextResponse.json({
            error: error.message, 
            status: 400
        });
    }
}