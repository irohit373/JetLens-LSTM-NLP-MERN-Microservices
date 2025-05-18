from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import pickle
import pandas as pd
import os
import logging
from datetime import datetime

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("predictions.log"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger("flight_price_predictor")

app = Flask(__name__)

# Set CORS to allow requests from any origin
CORS(app, origins=["http://localhost:3000", "http://127.0.0.1:3000"])

# Get the directory where app.py is located
current_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(current_dir, "flight_rf.pkl")

try:
    model = pickle.load(open(model_path, "rb"))
    print(f"Model loaded successfully from {model_path}")
    logger.info(f"Model loaded successfully from {model_path}")
except Exception as e:
    error_msg = f"Error loading model: {e}"
    print(error_msg)
    logger.error(error_msg)

@app.route("/")
@cross_origin()
def home():
    logger.info(f"Home endpoint accessed from {request.remote_addr}")
    # Add a simple info banner for debugging
    info = {
        "status": "online",
        "service": "JetLens Flight Price Prediction API",
        "endpoints": ["/predict", "/api/predict"],
        "model_path": model_path,
        "model_loaded": model is not None
    }
    return jsonify(info)

@app.route("/predict", methods = ["GET", "POST"])
@cross_origin()
def predict():
    if request.method == "POST":

        # Date_of_Journey
        date_dep = request.form["Dep_Time"]
        Journey_day = int(pd.to_datetime(date_dep, format="%Y-%m-%dT%H:%M").day)
        Journey_month = int(pd.to_datetime(date_dep, format ="%Y-%m-%dT%H:%M").month)
        # print("Journey Date : ",Journey_day, Journey_month)

        # Departure
        Dep_hour = int(pd.to_datetime(date_dep, format ="%Y-%m-%dT%H:%M").hour)
        Dep_min = int(pd.to_datetime(date_dep, format ="%Y-%m-%dT%H:%M").minute)
        # print("Departure : ",Dep_hour, Dep_min)

        # Arrival
        date_arr = request.form["Arrival_Time"]
        Arrival_hour = int(pd.to_datetime(date_arr, format ="%Y-%m-%dT%H:%M").hour)
        Arrival_min = int(pd.to_datetime(date_arr, format ="%Y-%m-%dT%H:%M").minute)
        # print("Arrival : ", Arrival_hour, Arrival_min)

        # Duration
        dur_hour = abs(Arrival_hour - Dep_hour)
        dur_min = abs(Arrival_min - Dep_min)
        # print("Duration : ", dur_hour, dur_min)

        # Total Stops
        Total_stops = int(request.form["stops"])
        # print(Total_stops)

        # Airline
        # AIR ASIA = 0 (not in column)
        airline=request.form['airline']
        if(airline=='Jet Airways'):
            Jet_Airways = 1
            IndiGo = 0
            Air_India = 0
            Multiple_carriers = 0
            SpiceJet = 0
            Vistara = 0
            GoAir = 0
            Multiple_carriers_Premium_economy = 0
            Jet_Airways_Business = 0
            Vistara_Premium_economy = 0
            Trujet = 0 

        elif (airline=='IndiGo'):
            Jet_Airways = 0
            IndiGo = 1
            Air_India = 0
            Multiple_carriers = 0
            SpiceJet = 0
            Vistara = 0
            GoAir = 0
            Multiple_carriers_Premium_economy = 0
            Jet_Airways_Business = 0
            Vistara_Premium_economy = 0
            Trujet = 0 

        elif (airline=='Air India'):
            Jet_Airways = 0
            IndiGo = 0
            Air_India = 1
            Multiple_carriers = 0
            SpiceJet = 0
            Vistara = 0
            GoAir = 0
            Multiple_carriers_Premium_economy = 0
            Jet_Airways_Business = 0
            Vistara_Premium_economy = 0
            Trujet = 0 
            
        elif (airline=='Multiple carriers'):
            Jet_Airways = 0
            IndiGo = 0
            Air_India = 0
            Multiple_carriers = 1
            SpiceJet = 0
            Vistara = 0
            GoAir = 0
            Multiple_carriers_Premium_economy = 0
            Jet_Airways_Business = 0
            Vistara_Premium_economy = 0
            Trujet = 0 
            
        elif (airline=='SpiceJet'):
            Jet_Airways = 0
            IndiGo = 0
            Air_India = 0
            Multiple_carriers = 0
            SpiceJet = 1
            Vistara = 0
            GoAir = 0
            Multiple_carriers_Premium_economy = 0
            Jet_Airways_Business = 0
            Vistara_Premium_economy = 0
            Trujet = 0 
            
        elif (airline=='Vistara'):
            Jet_Airways = 0
            IndiGo = 0
            Air_India = 0
            Multiple_carriers = 0
            SpiceJet = 0
            Vistara = 1
            GoAir = 0
            Multiple_carriers_Premium_economy = 0
            Jet_Airways_Business = 0
            Vistara_Premium_economy = 0
            Trujet = 0

        elif (airline=='GoAir'):
            Jet_Airways = 0
            IndiGo = 0
            Air_India = 0
            Multiple_carriers = 0
            SpiceJet = 0
            Vistara = 0
            GoAir = 1
            Multiple_carriers_Premium_economy = 0
            Jet_Airways_Business = 0
            Vistara_Premium_economy = 0
            Trujet = 0

        elif (airline=='Multiple carriers Premium economy'):
            Jet_Airways = 0
            IndiGo = 0
            Air_India = 0
            Multiple_carriers = 0
            SpiceJet = 0
            Vistara = 0
            GoAir = 0
            Multiple_carriers_Premium_economy = 1
            Jet_Airways_Business = 0
            Vistara_Premium_economy = 0
            Trujet = 0

        elif (airline=='Jet Airways Business'):
            Jet_Airways = 0
            IndiGo = 0
            Air_India = 0
            Multiple_carriers = 0
            SpiceJet = 0
            Vistara = 0
            GoAir = 0
            Multiple_carriers_Premium_economy = 0
            Jet_Airways_Business = 1
            Vistara_Premium_economy = 0
            Trujet = 0

        elif (airline=='Vistara Premium economy'):
            Jet_Airways = 0
            IndiGo = 0
            Air_India = 0
            Multiple_carriers = 0
            SpiceJet = 0
            Vistara = 0
            GoAir = 0
            Multiple_carriers_Premium_economy = 0
            Jet_Airways_Business = 0
            Vistara_Premium_economy = 1
            Trujet = 0
            
        elif (airline=='Trujet'):
            Jet_Airways = 0
            IndiGo = 0
            Air_India = 0
            Multiple_carriers = 0
            SpiceJet = 0
            Vistara = 0
            GoAir = 0
            Multiple_carriers_Premium_economy = 0
            Jet_Airways_Business = 0
            Vistara_Premium_economy = 0
            Trujet = 1

        else:
            Jet_Airways = 0
            IndiGo = 0
            Air_India = 0
            Multiple_carriers = 0
            SpiceJet = 0
            Vistara = 0
            GoAir = 0
            Multiple_carriers_Premium_economy = 0
            Jet_Airways_Business = 0
            Vistara_Premium_economy = 0
            Trujet = 0

        # print(Jet_Airways,
        #     IndiGo,
        #     Air_India,
        #     Multiple_carriers,
        #     SpiceJet,
        #     Vistara,
        #     GoAir,
        #     Multiple_carriers_Premium_economy,
        #     Jet_Airways_Business,
        #     Vistara_Premium_economy,
        #     Trujet)

        # Source
        # Banglore = 0 (not in column)
        Source = request.form["Source"]
        if (Source == 'Delhi'):
            s_Delhi = 1
            s_Kolkata = 0
            s_Mumbai = 0
            s_Chennai = 0

        elif (Source == 'Kolkata'):
            s_Delhi = 0
            s_Kolkata = 1
            s_Mumbai = 0
            s_Chennai = 0

        elif (Source == 'Mumbai'):
            s_Delhi = 0
            s_Kolkata = 0
            s_Mumbai = 1
            s_Chennai = 0

        elif (Source == 'Chennai'):
            s_Delhi = 0
            s_Kolkata = 0
            s_Mumbai = 0
            s_Chennai = 1

        else:
            s_Delhi = 0
            s_Kolkata = 0
            s_Mumbai = 0
            s_Chennai = 0

        # print(s_Delhi,
        #     s_Kolkata,
        #     s_Mumbai,
        #     s_Chennai)

        # Destination
        # Banglore = 0 (not in column)
        Source = request.form["Destination"]
        if (Source == 'Cochin'):
            d_Cochin = 1
            d_Delhi = 0
            d_New_Delhi = 0
            d_Hyderabad = 0
            d_Kolkata = 0
        
        elif (Source == 'Delhi'):
            d_Cochin = 0
            d_Delhi = 1
            d_New_Delhi = 0
            d_Hyderabad = 0
            d_Kolkata = 0

        elif (Source == 'New_Delhi'):
            d_Cochin = 0
            d_Delhi = 0
            d_New_Delhi = 1
            d_Hyderabad = 0
            d_Kolkata = 0

        elif (Source == 'Hyderabad'):
            d_Cochin = 0
            d_Delhi = 0
            d_New_Delhi = 0
            d_Hyderabad = 1
            d_Kolkata = 0

        elif (Source == 'Kolkata'):
            d_Cochin = 0
            d_Delhi = 0
            d_New_Delhi = 0
            d_Hyderabad = 0
            d_Kolkata = 1

        else:
            d_Cochin = 0
            d_Delhi = 0
            d_New_Delhi = 0
            d_Hyderabad = 0
            d_Kolkata = 0

        # print(
        #     d_Cochin,
        #     d_Delhi,
        #     d_New_Delhi,
        #     d_Hyderabad,
        #     d_Kolkata
        # )
        

    #     ['Total_Stops', 'Journey_day', 'Journey_month', 'Dep_hour',
    #    'Dep_min', 'Arrival_hour', 'Arrival_min', 'Duration_hours',
    #    'Duration_mins', 'Airline_Air India', 'Airline_GoAir', 'Airline_IndiGo',
    #    'Airline_Jet Airways', 'Airline_Jet Airways Business',
    #    'Airline_Multiple carriers',
    #    'Airline_Multiple carriers Premium economy', 'Airline_SpiceJet',
    #    'Airline_Trujet', 'Airline_Vistara', 'Airline_Vistara Premium economy',
    #    'Source_Chennai', 'Source_Delhi', 'Source_Kolkata', 'Source_Mumbai',
    #    'Destination_Cochin', 'Destination_Delhi', 'Destination_Hyderabad',
    #    'Destination_Kolkata', 'Destination_New Delhi']
        
        prediction=model.predict([
            [
                Total_stops,
                Journey_day,
                Journey_month,
                Dep_hour,
                Dep_min,
                Arrival_hour,
                Arrival_min,
                dur_hour,
                dur_min,
                Air_India,
                GoAir,
                IndiGo,
                Jet_Airways,
                Jet_Airways_Business,
                Multiple_carriers,
                Multiple_carriers_Premium_economy,
                SpiceJet,
                Trujet,
                Vistara,
                Vistara_Premium_economy,
                s_Chennai,
                s_Delhi,
                s_Kolkata,
                s_Mumbai,
                d_Cochin,
                d_Delhi,
                d_Hyderabad,
                d_Kolkata,
                d_New_Delhi
            ]
        ])

        output=round(prediction[0],2)

        return render_template('home.html',prediction_text="Your Flight price is Rs. {}".format(output))


    return render_template("home.html")

@app.route("/api/predict", methods=["POST"])
@cross_origin()
def api_predict():
    try:
        data = request.get_json()
        if not data:
            logger.error("No JSON data received")
            return jsonify({"error": "No data provided"}), 400
            
        request_time = pd.Timestamp.now().strftime("%Y-%m-%d %H:%M:%S")
        client_ip = request.remote_addr
        
        logger.info(f"[REQUEST] Time: {request_time} | IP: {client_ip} | Data: {data}")
        
        # Extract data from the request
        airline = data.get('airline', '')
        source = data.get('source', '')
        destination = data.get('destination', '')
        date_dep = data.get('departure_time')
        date_arr = data.get('arrival_time')
        stops = int(data.get('stops', 0))
        
        logger.info(f"Processing prediction for {airline} flight from {source} to {destination} with {stops} stops")
        
        # Process data similar to your existing predict function
        try:
            # Try different date formats
            try:
                Journey_day = int(pd.to_datetime(date_dep).day)
                Journey_month = int(pd.to_datetime(date_dep).month)
                Dep_hour = int(pd.to_datetime(date_dep).hour)
                Dep_min = int(pd.to_datetime(date_dep).minute)
                Arrival_hour = int(pd.to_datetime(date_arr).hour)
                Arrival_min = int(pd.to_datetime(date_arr).minute)
            except:
                # Try a specific format if automatic parsing fails
                logger.warning(f"First date parsing attempt failed, trying alternative format")
                Journey_day = int(pd.to_datetime(date_dep, format="%Y-%m-%dT%H:%M:%S.%fZ").day)
                Journey_month = int(pd.to_datetime(date_dep, format="%Y-%m-%dT%H:%M:%S.%fZ").month)
                Dep_hour = int(pd.to_datetime(date_dep, format="%Y-%m-%dT%H:%M:%S.%fZ").hour)
                Dep_min = int(pd.to_datetime(date_dep, format="%Y-%m-%dT%H:%M:%S.%fZ").minute)
                Arrival_hour = int(pd.to_datetime(date_arr, format="%Y-%m-%dT%H:%M:%S.%fZ").hour)
                Arrival_min = int(pd.to_datetime(date_arr, format="%Y-%m-%dT%H:%M:%S.%fZ").minute)
        
            dur_hour = abs(Arrival_hour - Dep_hour)
            dur_min = abs(Arrival_min - Dep_min)
            
            logger.info(f"Time features: Day: {Journey_day}, Month: {Journey_month}, Duration: {dur_hour}h {dur_min}m")
            
        except Exception as e:
            error_msg = f"Date parsing error: {e}"
            logger.error(error_msg)
            # Fallback values if date parsing fails
            Journey_day = 15
            Journey_month = 6
            Dep_hour = 12
            Dep_min = 0
            Arrival_hour = 14
            Arrival_min = 0
            dur_hour = 2
            dur_min = 0
            logger.warning(f"Using fallback time values due to parsing error")
        
        # Initialize all airline variables to 0
        airlines_dict = {
            'Jet_Airways': 0, 'IndiGo': 0, 'Air_India': 0, 'Multiple_carriers': 0,
            'SpiceJet': 0, 'Vistara': 0, 'GoAir': 0, 'Multiple_carriers_Premium_economy': 0,
            'Jet_Airways_Business': 0, 'Vistara_Premium_economy': 0, 'Trujet': 0
        }
        
        # Map input airline to our model's airline features
        airline = airline.lower()
        if 'indigo' in airline:
            airlines_dict['IndiGo'] = 1
        elif 'air india' in airline:
            airlines_dict['Air_India'] = 1
        elif 'spicejet' in airline:
            airlines_dict['SpiceJet'] = 1
        elif 'multiple carriers' in airline and 'premium' in airline:
            airlines_dict['Multiple_carriers_Premium_economy'] = 1
        elif 'multiple carriers' in airline:
            airlines_dict['Multiple_carriers'] = 1
        elif 'goair' in airline or 'go air' in airline:
            airlines_dict['GoAir'] = 1
        elif 'vistara' in airline and 'premium' in airline:
            airlines_dict['Vistara_Premium_economy'] = 1
        elif 'vistara' in airline:
            airlines_dict['Vistara'] = 1
        elif 'jet airways' in airline and 'business' in airline:
            airlines_dict['Jet_Airways_Business'] = 1
        elif 'jet airways' in airline:
            airlines_dict['Jet_Airways'] = 1
        elif 'trujet' in airline:
            airlines_dict['Trujet'] = 1
        
        logger.info(f"Mapped airline '{airline}' to model features: {[k for k, v in airlines_dict.items() if v == 1]}")
        
        # Initialize source variables
        source_dict = {'s_Delhi': 0, 's_Kolkata': 0, 's_Mumbai': 0, 's_Chennai': 0}
        
        # Map source to our features
        source = source.upper()
        if 'DEL' in source:
            source_dict['s_Delhi'] = 1
        elif 'CCU' in source:
            source_dict['s_Kolkata'] = 1
        elif 'BOM' in source:
            source_dict['s_Mumbai'] = 1
        elif 'MAA' in source:
            source_dict['s_Chennai'] = 1
        
        logger.info(f"Mapped source '{source}' to model features: {[k for k, v in source_dict.items() if v == 1]}")
        
        # Initialize destination variables
        dest_dict = {
            'd_Cochin': 0, 'd_Delhi': 0, 'd_New_Delhi': 0, 
            'd_Hyderabad': 0, 'd_Kolkata': 0
        }
        
        # Map destination to our features
        destination = destination.upper()
        if 'COK' in destination:
            dest_dict['d_Cochin'] = 1
        elif 'DEL' in destination:
            dest_dict['d_Delhi'] = 1
            dest_dict['d_New_Delhi'] = 1
        elif 'HYD' in destination:
            dest_dict['d_Hyderabad'] = 1
        elif 'CCU' in destination:
            dest_dict['d_Kolkata'] = 1
        
        logger.info(f"Mapped destination '{destination}' to model features: {[k for k, v in dest_dict.items() if v == 1]}")
        
        # Create prediction array
        prediction_array = [
            stops,
            Journey_day,
            Journey_month,
            Dep_hour,
            Dep_min,
            Arrival_hour,
            Arrival_min,
            dur_hour,
            dur_min
        ]
        
        # Add airline features
        prediction_array.extend([
            airlines_dict['Air_India'],
            airlines_dict['GoAir'],
            airlines_dict['IndiGo'],
            airlines_dict['Jet_Airways'],
            airlines_dict['Jet_Airways_Business'],
            airlines_dict['Multiple_carriers'],
            airlines_dict['Multiple_carriers_Premium_economy'],
            airlines_dict['SpiceJet'],
            airlines_dict['Trujet'],
            airlines_dict['Vistara'],
            airlines_dict['Vistara_Premium_economy']
        ])
        
        # Add source features
        prediction_array.extend([
            source_dict['s_Chennai'],
            source_dict['s_Delhi'],
            source_dict['s_Kolkata'],
            source_dict['s_Mumbai']
        ])
        
        # Add destination features
        prediction_array.extend([
            dest_dict['d_Cochin'],
            dest_dict['d_Delhi'],
            dest_dict['d_Hyderabad'],
            dest_dict['d_Kolkata'],
            dest_dict['d_New_Delhi']
        ])
        
        # Make prediction using the model
        logger.info(f"Input features array prepared with {len(prediction_array)} features")
        prediction = model.predict([prediction_array])
        predicted_price = round(float(prediction[0]), 2)
        
        logger.info(f"[PREDICTION] Time: {request_time} | Value: ₹{predicted_price:.2f} | Airline: {airline} | Route: {source}-{destination} | Stops: {stops}")
        
        return jsonify({
            'predicted_price': predicted_price,
            'features': {
                'airline': airline,
                'source': source,
                'destination': destination,
                'stops': stops
            }
        })
    except Exception as e:
        logger.error(f"Error in API prediction: {str(e)}")
        return jsonify({
            'error': 'Prediction failed',
            'message': str(e)
        }), 500

# Add this route to app.py
@app.route("/logs", methods=["GET"])
@cross_origin()
def view_logs():
    try:
        with open("predictions.log", "r") as f:
            logs = f.readlines()
        
        # Get the last 100 logs for safety
        recent_logs = logs[-100:]
        
        return jsonify({
            "logs": recent_logs
        })
    except Exception as e:
        return jsonify({
            "error": f"Error reading logs: {str(e)}"
        }), 500

# Add this route to your app.py
@app.route("/health")
@cross_origin()
def health_check():
    try:
        # Try a simple prediction to ensure model is working
        test_data = {
            "airline": "IndiGo", 
            "source": "DEL",
            "destination": "BOM",
            "departure_time": "2023-05-01T10:00:00Z",
            "arrival_time": "2023-05-01T12:00:00Z",
            "stops": 0
        }
        
        # Create feature array (simplified)
        test_array = [0, 1, 5, 10, 0, 12, 0, 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]
        
        # Try prediction
        prediction = model.predict([test_array])
        
        return jsonify({
            "status": "healthy",
            "model_loaded": True,
            "test_prediction": float(prediction[0]),
            "version": "1.0.0"
        })
    except Exception as e:
        return jsonify({
            "status": "unhealthy",
            "error": str(e)
        }), 500

if __name__ == "__main__":
    # Print a banner with server information for easy debugging
    print("\n====== JetLens Price Prediction API ======")
    print(f"Local:   http://127.0.0.1:5000")
    print(f"Network: http://[your-IP]:5000")
    print(f"API endpoint: http://127.0.0.1:5000/api/predict")
    print(f"Logs viewer: http://127.0.0.1:5000/logs")
    print("=========================================\n")
    
    logger.info(f"Starting server on port 5000")
    app.run(host='0.0.0.0', port=5000, debug=True)
