import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const apiUrl = `${process.env.ML_API_URL || "http://127.0.0.1:5000"}/health`;
    
    const response = await axios.get(apiUrl, { timeout: 3000 });
    
    return NextResponse.json({
      mlServiceStatus: "online",
      healthCheck: response.data,
      api: apiUrl
    });
  } catch (error) {
    return NextResponse.json({
      mlServiceStatus: "offline",
      error: error.message
    }, { status: 200 }); // Still return 200 to not break the UI
  }
}