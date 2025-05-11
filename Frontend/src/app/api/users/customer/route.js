import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import {connectDB} from "@/dbconfig/dbconfig";

connectDB();

export async function GET(request) {
    try {
        const userID = await getDataFromToken(request);
        const user = await User.findOne({_id: userID}).select("-password");

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