import {connectDB} from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// Connect to the database
connectDB();

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { username, password } = reqBody;

        // Find the user by username
        const user = await User.findOne({username});

        // If user not found, return an error
        if (!user) {
            return NextResponse.json({
                message: "User Doesn't exist",
            }, { status: 400 });
        }

        // Compare the password with the hashed password in the database
        const isMatch = await bcryptjs.compare(password, user.password);

        if (!isMatch) {
            return NextResponse.json({
                message: "Invalid credentials",
            }, { status: 401 });
        }


        // Generate a token (this is just a placeholder, implement your own token generation logic)
        // const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '1h' });  
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        };

        const token = await jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '1d' });

        const response = NextResponse.json({
            message: "User logged in successfully",
            success: true,
        }, { status: 200 });

        response.cookies.set("token", token, {httpOnly:true})

        return response;

    } catch (err) {
        console.error("Error in login:", err);
        return NextResponse.json({
            message: "Internal server error",
            error: err.message,
        }, { status: 500 });
    }
}