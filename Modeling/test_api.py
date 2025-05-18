import requests
import json
import time
import os

def test_prediction_api():
    """Test the flight price prediction API"""
    url = "http://127.0.0.1:5000/api/predict"
    
    # Test data
    data = {
        "airline": "IndiGo",
        "source": "DEL",
        "destination": "BOM",
        "departure_time": "2023-07-15T10:00:00.000Z",
        "arrival_time": "2023-07-15T12:30:00.000Z",
        "stops": 0
    }
    
    # Retry mechanism for API not ready
    max_retries = 5
    for retry in range(max_retries):
        try:
            print(f"Attempt {retry+1}/{max_retries} to connect to API...")
            response = requests.post(url, json=data, timeout=10)
            response.raise_for_status()
            
            result = response.json()
            print("\n" + "="*50)
            print("API Response:")
            print("="*50)
            print(json.dumps(result, indent=2))
            print("="*50)
            
            if 'predicted_price' in result:
                print(f"\nPredicted price: ₹{result['predicted_price']}")
                print(f"\nAPI is working correctly!")
                print("\nFeatures used for prediction:")
                for key, value in result.get('features', {}).items():
                    print(f"- {key}: {value}")
                return True
            else:
                print(f"\nError: No prediction in response")
                return False
        except requests.exceptions.RequestException as e:
            print(f"API Error: {e}")
            if retry < max_retries - 1:
                wait_time = 2 * (retry + 1)  # Exponential backoff
                print(f"Retrying in {wait_time} seconds...")
                time.sleep(wait_time)
            else:
                print("\nFailed to connect to the API after multiple attempts.")
                print("\nPossible causes:")
                print("1. The Flask server is not running")
                print("2. There's another service using port 5000")
                print("3. A firewall is blocking the connection")
                print("\nTry running these commands:")
                print("- Check if port 5000 is in use: netstat -ano | findstr :5000")
                print("- Kill process using port 5000: taskkill /PID <PID> /F")
                print("- Start the Flask server manually: cd Modeling && python run.py")
                return False

if __name__ == "__main__":
    print("Testing Flight Price Prediction API...")
    success = test_prediction_api()
    if success:
        print("\n✅ API test successful!")
        # Check if predictions.log exists
        if os.path.exists("predictions.log"):
            print("\nLast 5 prediction log entries:")
            with open("predictions.log", "r") as f:
                lines = f.readlines()
                for line in lines[-5:]:
                    print(f"> {line.strip()}")
    else:
        print("\n❌ API test failed!")