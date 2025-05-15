import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import axios from "axios";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const date = searchParams.get("date");
  const travelers = searchParams.get("travelers") || 1;
  const API = process.env.FLIGHT_API_KEY;

  if (!from || !to || !date) {
    return NextResponse.json(
      { error: "Missing required query parameters: from, to, or date" },
      { status: 400 }
    );
  }
  const fileName = `${from}-${to}-${date}.json`;
  console.log("File Name:", fileName);
  const filePath = path.join("public", "data", fileName);
  console.log("File Path:", filePath);

  // Check if the file already exists
  if (fs.existsSync(filePath)) {
    console.log("Reading flight data from local file...");
    const flightData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    return NextResponse.json({ flightData });
  }

  try {
    console.log("Fetching flight data from API...");
    // Fetch flight data from the external API
    const apiUrl = `https://api.flightapi.io/onewaytrip/${API}/${from}/${to}/${date}/${travelers}/0/0/Economy/INR`;
    const response = await axios.get(apiUrl);

    const flightData = response.data;

    // Save the response to a JSON file in the public/data folder
    fs.writeFileSync(filePath, JSON.stringify(flightData, null, 2));

    return NextResponse.json({ flightData });
  } catch (error) {
    console.error("Error fetching flight data:", error);
    return NextResponse.json(
      { error: "Failed to fetch flight data", message: error.message },
      { status: 500 }
    );
  }
}