import {connectDB} from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connectDB();

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;

        console.log("Request Body:", reqBody);

        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({
                message: "User already exists",
            }, {status: 400});
        }

        // Hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt); 

        const newUser = new User({ 
            username,
            email,
            password: hashedPassword,
        })
        
        const savedUser = await newUser.save();
        console.log("User created successfully:", savedUser);

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        }, {status: 201});
        
    } catch (err) {
        return NextResponse.json({
            message: "Error in creating user",
            error: err.message,
        }, {status: 500});
    }
}