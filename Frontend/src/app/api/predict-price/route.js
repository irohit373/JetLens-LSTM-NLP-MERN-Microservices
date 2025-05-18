import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Call the Flask API with the flight data
    const response = await axios.post(
      `${process.env.ML_API_URL || "http://localhost:5000"}/api/predict`,
      data
    );

    // Return the prediction
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Prediction error:", error);
    return NextResponse.json(
      { error: "Failed to predict price", message: error.message },
      { status: 500 }
    );
  }
}