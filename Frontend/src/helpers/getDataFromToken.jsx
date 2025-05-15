import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromBrowserToken = () => {
    try {
        const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        return decodedToken;
    } catch (error) {
        throw new Error(error.message);        
    }
}
const getDataFromToken = (request) => {
    try {
        const token = request.cookies.get('token')?.value || '';
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        return decodedToken;
    } catch (error) {
        throw new Error(error.message);        
    }
}

export default getDataFromToken;
