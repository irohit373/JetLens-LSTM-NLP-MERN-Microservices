import React, { useState, useEffect } from 'react';
// Import React Icons
import { FaPlaneDeparture, FaPlaneArrival, FaClock, FaMoneyBillWave } from 'react-icons/fa';
import { IoAirplane } from 'react-icons/io5';
import { BiTransfer } from 'react-icons/bi';
import { BsCalendarDate } from 'react-icons/bs';
import axios from 'axios';
import MLStatusIndicator from '@/components/MLStatusIndicator';

// Flight card component specifically designed for the Skyscanner-like API response
const FlightCard = ({ itinerary, legs, places, carriers, agents }) => {
  const [logoError, setLogoError] = useState(false);
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [isPredicting, setIsPredicting] = useState(true);
  const [isEstimate, setIsEstimate] = useState(false);
  
  // Find the leg information for this itinerary
  const leg = legs.find(leg => leg.id === itinerary.leg_ids[0]);
  if (!leg) return null;
  
  // Find origin and destination places
  const origin = places.find(place => place.id === leg.origin_place_id);
  const destination = places.find(place => place.id === leg.destination_place_id);
  
  // Format departure and arrival times
  const formatTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  // Format date
  const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', weekday: 'short' });
  };
  
  // Format duration (minutes to hours and minutes)
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };
  
  // Get carrier information based on leg
  const carrierId = leg.marketing_carrier_ids?.[0] || leg.operating_carrier_ids?.[0] || leg.carrier_id;
  const carrier = carriers.find(c => c.id === carrierId);
  
  const carrierName = carrier?.name || "Unknown Airline";
  const carrierCode = carrier?.display_code || "";
  
  // Build the online carrier logo URL using pics.avs.io API & fallback using logoError
  const logoUrl = `https://pics.avs.io/200/200/${carrierCode}.png`;
  
  // Get the cheapest price option
  const price = itinerary.cheapest_price?.amount;
  
  // Find the agent for this pricing option
  const agentId = itinerary.pricing_options?.[0]?.agent_ids?.[0];
  const agent = agents.find(agent => agent.id === agentId);

  // Generate a score badge color based on the itinerary score
  const getScoreBadgeColor = (score) => {
    if (score >= 9) return "bg-green-100 text-green-800";
    if (score >= 7) return "bg-blue-100 text-blue-800";
    if (score >= 5) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  // Handle click on the Details button to redirect to the agent page via Skyscanner
  const handleDetailsClick = () => {
    // Use the URL from the first items array instead of agent_url
    const agentPath = itinerary.pricing_options?.[0]?.items?.[0]?.url;
    if (agentPath) {
      const finalUrl = `https://www.skyscanner.net${agentPath}`;
      window.open(finalUrl, '_blank'); // Opens in a new tab.
    } else {
      alert("No booking details available for this agent.");
    }
  };
  
  // Get price prediction when component mounts
  useEffect(() => {
    const predictPrice = async () => {
      try {
        setIsPredicting(true);
        
        // Get carrier information
        const carrierId = leg.marketing_carrier_ids?.[0] || 
                         leg.operating_carrier_ids?.[0] || 
                         leg.carrier_id;
        const carrier = carriers.find(c => c.id === carrierId);
        const carrierName = carrier?.name || "Unknown Airline";
        
        // Format departure and arrival times
        const departureDateTime = new Date(leg.departure).toISOString();
        const arrivalDateTime = new Date(leg.arrival).toISOString();
        
        // Create data object for prediction
        const predictionData = {
          airline: carrierName,
          source: origin?.display_code || "",
          destination: destination?.display_code || "",
          departure_time: departureDateTime,
          arrival_time: arrivalDateTime,
          stops: leg.stop_count || 0
        };
        
        console.log(`Requesting prediction for flight: ${origin?.display_code} → ${destination?.display_code} | ${carrierName} | Stops: ${leg.stop_count}`);
        
        try {
          // Call prediction API
          const response = await axios.post('/api/predict-price', predictionData);
          setPredictedPrice(response.data.predicted_price);
          setIsEstimate(response.data.note ? true : false);
          
          console.log(`Prediction received: ₹${response.data.predicted_price} ${response.data.note ? "(Estimate)" : "(ML Prediction)"}`);
        } catch (error) {
          console.error('Error predicting price:', error);
          
          // Simple fallback calculation
          const basePrice = 5000;
          const stopMultiplier = (leg.stop_count || 0) * 1200;
          const fallbackPrice = basePrice + stopMultiplier;
          
          setPredictedPrice(fallbackPrice);
          setIsEstimate(true);
          
          console.log(`Using fallback price: ₹${fallbackPrice} (Frontend Fallback)`);
        }
      } catch (error) {
        console.error('Error in price prediction flow:', error);
      } finally {
        setIsPredicting(false);
      }
    };
    
    predictPrice();
  }, [leg, origin, destination, carriers]);

  return (
    <div className="w-3xl bg-white border border-gray-200 rounded-xl p-5 mb-6 shadow-md hover:shadow-lg transition-all duration-300">
      {/* Header with airline and stop info */}
      <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-100">
        <div className="flex items-center">
          <div className="bg-blue-50 p-2 rounded-lg mr-3">
            {logoError || !carrierCode ? (
              <IoAirplane className="text-blue-500 text-xl" />
            ) : (
              <img
                src={logoUrl}
                alt={carrierName}
                onError={() => setLogoError(true)}
                className="h-10 w-10 object-contain"
              />
            )}
          </div>
          <div>
            <span className="font-bold text-lg text-gray-800">{carrierName}</span>
            <div className="text-xs text-gray-500 mt-0.5">Flight {carrierCode}</div>
          </div>
        </div>
        <div className="flex items-center">
          <div className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center ${getScoreBadgeColor(itinerary.score)}`}>
            <span className="mr-1">Score:</span>
            {itinerary.score?.toFixed(1) || "N/A"}
          </div>
        </div>
      </div>
      
      {/* Flight Details */}
      <div className="flex items-center mb-5">
        {/* Departure */}
        <div className="text-center w-1/4">
          <div className="flex justify-center mb-1">
            <FaPlaneDeparture className="text-blue-600" />
          </div>
          <div className="font-bold text-xl text-gray-800">{formatTime(leg.departure)}</div>
          <div className="text-sm font-medium text-gray-700">{origin?.display_code || "???"}</div>
          <div className="text-xs text-gray-500 mt-1">{origin?.name || "Unknown"}</div>
        </div>
        
        {/* Flight Path */}
        <div className="flex-grow px-2">
          <div className="flex flex-col items-center">
            <div className="text-xs text-gray-500 mb-1 flex items-center">
              <FaClock className="mr-1" /> {formatDuration(leg.duration)}
            </div>
            <div className="w-full flex items-center">
              <div className="h-0.5 flex-grow bg-gray-300"></div>
              <div className="mx-2 bg-white p-1 rounded-full border border-blue-300">
                {leg.stop_count === 0 ? (
                  <div className="text-xs text-blue-600 font-medium">Direct</div>
                ) : (
                  <div className="flex items-center text-xs text-orange-600 font-medium">
                    <BiTransfer className="mr-1" />
                    {leg.stop_count} {leg.stop_count > 1 ? 'stops' : 'stop'}
                  </div>
                )}
              </div>
              <div className="h-0.5 flex-grow bg-gray-300"></div>
            </div>
            <div className="text-xs text-gray-500 mt-1 flex items-center">
              <BsCalendarDate className="mr-1" /> {formatDate(leg.departure)}
            </div>
          </div>
        </div>
        
        {/* Arrival */}
        <div className="text-center w-1/4">
          <div className="flex justify-center mb-1">
            <FaPlaneArrival className="text-blue-600" />
          </div>
          <div className="font-bold text-xl text-gray-800">{formatTime(leg.arrival)}</div>
          <div className="text-sm font-medium text-gray-700">{destination?.display_code || "???"}</div>
          <div className="text-xs text-gray-500 mt-1">{destination?.name || "Unknown"}</div>
        </div>
      </div>
      
      {/* Footer with price and booking info */}
      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
        <div className="flex items-center">
          <div className="bg-green-50 p-1.5 rounded-full mr-2">
            <FaMoneyBillWave className="text-green-600" />
          </div>
          <div>
            <div className="font-bold text-xl text-green-600">₹{price?.toLocaleString() || "N/A"}</div>
            <div className="text-xs text-gray-500">per person</div>
            
            {/* Add predicted price */}
            {isPredicting ? (
              <div className="text-xs text-gray-500 mt-1 flex items-center">
                <svg className="animate-spin -ml-1 mr-1 h-3 w-3 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Predicting best price...
              </div>
            ) : predictedPrice ? (
              <div className={`text-xs ${isEstimate ? 'text-amber-600' : 'text-green-600'} mt-1`}>
                {isEstimate ? 'Est. Price:' : 'AI Predicted:'} ₹{predictedPrice.toLocaleString()}
                {isEstimate && <span className="text-gray-500 text-xs"> (ML service offline)</span>}
              </div>
            ) : null}
          </div>
        </div>
        
        <div className="flex flex-col items-end">
          <div className="text-sm font-medium text-gray-700">{agent?.name || "Unknown Agent"}</div>
          <div className="text-xs text-gray-500">
            {agent?.rating ? `Rating: ${agent.rating.toFixed(1)}/5` : "No rating"}
          </div>
        </div>
        
        <button 
          onClick={handleDetailsClick}
          className="bg-blue-600 text-white py-2 px-6 rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors"
        >
          Details
        </button>
      </div>
      
      {/* ML Status Indicator - Centered */}
      <div className="mt-2 flex justify-center">
        <MLStatusIndicator />
      </div>
    </div>
  );
};

export default FlightCard;
