import { NextResponse } from "next/server";
import axios from "axios";
import fs from 'fs';
import path from 'path';

// Simple logging function - will create a log file in the project root
const logPrediction = (type, data, result, error = null) => {
  try {
    const timestamp = new Date().toISOString();
    const logDir = path.join(process.cwd(), 'logs');
    const logFile = path.join(logDir, 'frontend_predictions.log');
    
    // Create logs directory if it doesn't exist
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
    
    const logEntry = `[${timestamp}] ${type} | Airline: ${data.airline || 'unknown'} | Route: ${data.source || 'unknown'}-${data.destination || 'unknown'} | Stops: ${data.stops || 0} | Price: ${result?.predicted_price || 'error'} | ${error ? `Error: ${error}` : ''}`;
    fs.appendFileSync(logFile, logEntry + '\n');
  } catch (logError) {
    console.error("Logging error:", logError);
  }
};

export async function POST(request) {
  try {
    const data = await request.json();
    
    try {
      // Log the incoming request
      console.log(`Predicting price for ${data.airline} flight from ${data.source} to ${data.destination} with ${data.stops} stops`);
      
      // IMPORTANT: Use explicit IP address (127.0.0.1) instead of localhost to force IPv4
      const apiUrl = `${process.env.ML_API_URL || "http://127.0.0.1:5000"}/api/predict`;
      console.log(`Connecting to ML API at: ${apiUrl}`);
      
      const response = await axios.post(
        apiUrl,
        data,
        { 
          timeout: 5000,
          headers: { 'Content-Type': 'application/json' }
        }
      );

      // Log successful prediction
      logPrediction('ML_PREDICTION', data, response.data);
      
      // Return the prediction
      return NextResponse.json(response.data);
    } catch (error) {
      console.error("ML API connection error:", error.message);
      
      // Fallback logic when Flask API is unreachable
      const stops = data.stops || 0;
      const basePrice = 5000; // Base price in rupees
      const stopMultiplier = stops * 1500; // Each stop adds 1500 rupees
      
      // Premium airlines get higher prices
      const premiumAirlines = ['Vistara', 'Air India', 'Jet Airways'];
      const airlineMultiplier = premiumAirlines.includes(data.airline) ? 1.2 : 1;
      
      const estimatedPrice = Math.round((basePrice + stopMultiplier) * airlineMultiplier);
      
      const result = {
        predicted_price: estimatedPrice,
        note: "This is an estimated price as the ML service is currently unavailable."
      };
      
      // Log fallback prediction
      logPrediction('FALLBACK_PREDICTION', data, result, error.message);
      
      return NextResponse.json(result);
    }
  } catch (error) {
    console.error("Prediction error:", error);
    
    // Log error
    logPrediction('ERROR', {}, null, error.message);
    
    return NextResponse.json(
      { error: "Failed to predict price", message: error.message },
      { status: 500 }
    );
  }
}