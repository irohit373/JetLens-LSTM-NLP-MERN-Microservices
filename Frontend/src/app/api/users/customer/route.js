import getDataFromToken from "@/helpers/getDataFromToken";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import connectDB from "@/dbconfig/dbconfig";

connectDB();

export async function GET(request) {
    try {
        const userData = await getDataFromToken(request);
        console.log(userData);
        console.log(userData.id);
        const user = await User.findOne({_id: userData.id}).select("-password");

        return NextResponse.json({
            message: "User Found",
            data: user, 
            status: 200
    });
    } catch (error) {
        return NextResponse.json({
            error: error.message, 
            status: 400
        });
    }
}