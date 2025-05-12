import connectDB from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import sendEmail from "@/helpers/mailer";

connectDB();

export async function POST(request) {
    try {

        console.log("Request received at /api/users/signup");
        console.log("Request Method:", request.method);
        const reqBody = await request.json();

        console.log("Request Body:", reqBody);
        console.log("Request Headers:", request.headers);
        const { username, email, password } = reqBody;

        console.log("Request Body:", reqBody);

        const user = await User.findOne({email})

        console.log("User found:", user);

        // Check if user already exists
        if(user){
            return NextResponse.json({
                message: "User already exists",
            }, {status: 400});
        }

        // Hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt); 
        console.log("Password hashed successfully : ", hashedPassword);

        console.log("Creating new user...");
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        })
        
        const savedUser = await newUser.save();

        console.log("User created successfully:", savedUser);
        
        // Send verification email
        console.log("Sending verification email...");
        await sendEmail({email, emailType: "VERIFY"}, savedUser._id);
        console.log("email verification sent");

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