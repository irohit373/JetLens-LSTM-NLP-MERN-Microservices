import { NextResponse } from "next/server";

export async function GET(){
    try {
        const response = NextResponse.json({ 
            message: "Logout successful" },
            { status: 200 }
        );
        
        response.cookies.set("token", "", {
            httpOnly: true,
            expires : new Date(0)
        });
        console.log("Logout successful");
        console.log("Cookie cleared");
        return response;
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Logout failed" }, { status: 500 });
        
    }
} 