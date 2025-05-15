import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/dbconfig/dbconfig";
import User from "@/models/userModel";

connectDB();

export async function POST(request) {
    try {
        const reqBody = await request.json();
        
        const { token } = reqBody;


        const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } })
        

        if(!user){
            return NextResponse.json({
                success: false,
                message: "Token is invalid or has expired"
            }, {
                status: 400
            });
        }

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({
            success: true,
            message: "Email verified successfully"
        }, {
            status: 200
        });

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message
        }, {
            status: 500
        });       
    }
}