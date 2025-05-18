import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  const results = {
    ipv4Test: null,
    ipv6Test: null,
    timestamp: new Date().toISOString()
  };
  
  // Test IPv4 connection
  try {
    console.log("Testing IPv4 connection to API...");
    const ipv4Response = await axios.get("http://127.0.0.1:5000/", { 
      timeout: 3000 
    });
    results.ipv4Test = {
      success: true,
      status: ipv4Response.status,
      statusText: ipv4Response.statusText
    };
  } catch (error) {
    results.ipv4Test = {
      success: false,
      message: error.message,
      code: error.code
    };
  }
  
  // Test IPv6 connection
  try {
    console.log("Testing IPv6 connection to API...");
    const ipv6Response = await axios.get("http://[::1]:5000/", { 
      timeout: 3000 
    });
    results.ipv6Test = {
      success: true,
      status: ipv6Response.status,
      statusText: ipv6Response.statusText
    };
  } catch (error) {
    results.ipv6Test = {
      success: false,
      message: error.message,
      code: error.code
    };
  }
  
  return NextResponse.json(results);
}