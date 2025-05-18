// test-api.js
const axios = require('axios');

async function testAPI() {
  try {
    console.log("Testing ML API...");
    const response = await axios.post('http://127.0.0.1:5000/api/predict', {
      airline: "IndiGo",
      source: "DEL",
      destination: "BOM",
      departure_time: "2023-07-15T10:00:00.000Z",
      arrival_time: "2023-07-15T12:30:00.000Z",
      stops: 0
    });
    
    console.log("API response:", response.data);
    return true;
  } catch (error) {
    console.error("API Error:", error.message);
    return false;
  }
}

testAPI().then(success => {
  console.log(success ? "Test passed!" : "Test failed!");
});