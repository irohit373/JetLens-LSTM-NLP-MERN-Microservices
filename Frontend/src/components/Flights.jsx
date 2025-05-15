'use client';
import React, { useState, useEffect } from 'react';
import FlightCard from '@/components/FlightCard/flightCard';
import axios from 'axios';

const Flights = ({ from, to, date }) => {
  const [flightData, setFlightData] = useState(null);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState('price'); // Default sort by price
  const [maxPrice, setMaxPrice] = useState(''); // Filter by max price
  const [selectedCarrier, setSelectedCarrier] = useState(''); // Filter by carrier

  useEffect(() => {
    const fetchFlightData = async () => {
      try {
        const response = await axios.get('/api/flights', {
          params: { from, to, date },
        });

        setFlightData(response.data.flightData);
        setFilteredFlights(response.data.flightData.itineraries || []);
      } catch (error) {
        console.error('Error loading flight data:', error);
        setFlightData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchFlightData();
  }, [from, to, date]);

  useEffect(() => {
    if (!flightData || !flightData.itineraries) return;

    let flights = [...flightData.itineraries];

    // Apply price filter
    if (maxPrice) {
      flights = flights.filter(
        (itinerary) => itinerary.cheapest_price?.amount <= parseFloat(maxPrice)
      );
    }

    // Apply sorting
    if (sortOption === 'price') {
      flights.sort((a, b) => a.cheapest_price?.amount - b.cheapest_price?.amount);
    } else if (sortOption === 'duration') {
      flights.sort((a, b) => {
        const legA = flightData.legs.find((leg) => leg.id === a.leg_ids[0]);
        const legB = flightData.legs.find((leg) => leg.id === b.leg_ids[0]);
        return legA.duration - legB.duration;
      });
    } else if (sortOption === 'score') {
      flights.sort((a, b) => b.score - a.score);
    }

    setFilteredFlights(flights);
  }, [flightData, sortOption, maxPrice, selectedCarrier]);

  const renderSkeletonLoader = () => (
    <div className="animate-pulse">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="w-full bg-white border border-gray-200 rounded-xl p-5 mb-6 shadow-md">
          <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-100">
            <div className="flex items-center">
              <div className="bg-gray-200 rounded-lg h-10 w-10 mr-3"></div>
              <div>
                <div className="h-4 bg-gray-200 rounded w-40 mb-2"></div>
                <div className="h-3 bg-gray-100 rounded w-20"></div>
              </div>
            </div>
            <div className="bg-gray-200 h-6 w-16 rounded-full"></div>
          </div>
          
          <div className="flex items-center mb-5">
            <div className="text-center w-1/4">
              <div className="h-6 bg-gray-200 rounded w-16 mx-auto mb-2"></div>
              <div className="h-4 bg-gray-100 rounded w-10 mx-auto"></div>
            </div>
            
            <div className="flex-grow px-2">
              <div className="flex flex-col items-center">
                <div className="h-3 bg-gray-100 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                <div className="h-3 bg-gray-100 rounded w-full"></div>
              </div>
            </div>
            
            <div className="text-center w-1/4">
              <div className="h-6 bg-gray-200 rounded w-16 mx-auto mb-2"></div>
              <div className="h-4 bg-gray-100 rounded w-10 mx-auto"></div>
            </div>
          </div>
          
          <div className="flex justify-between items-center pt-3 border-t border-gray-100">
            <div className="h-8 bg-gray-200 rounded w-24"></div>
            <div className="h-6 bg-gray-100 rounded w-32"></div>
            <div className="h-10 bg-gray-200 rounded w-20"></div>
          </div>
        </div>
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="relative w-24 h-24">
          <div className="absolute top-0 left-0 w-full h-full">
            <svg className="animate-spin" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <circle 
                className="stroke-blue-600" 
                fill="none" 
                strokeWidth="8"
                strokeLinecap="round" 
                cx="50" cy="50" r="42" 
                strokeDasharray="283" 
                strokeDashoffset="80" 
              />
            </svg>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-12 h-12 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
        <div className="mt-4 text-center">
          <h3 className="text-lg font-semibold text-gray-800">Finding the best flights</h3>
          <p className="text-gray-500 mt-1">This may take a few moments...</p>
          <div className="mt-3">
            <div className="flex justify-center space-x-1">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!flightData) {
    return <div className="text-center text-red-500">No flight data available.</div>;
  }

  const { legs, places, carriers, agents } = flightData;

  if (!legs || !places || !carriers) {
    return <div className="text-center text-red-500">Invalid flight data structure.</div>;
  }

  return (
    <div>
      <h1 className="text-5xl pb-6 text-gray-900 mb-4">Available Flights</h1>

      {/* Sort and Filter Options */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        {/* Sort Options */}
        <div className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl px-4 py-2">
          <label htmlFor="sort" className="font-medium text-gray-700">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="price">Price (Lowest)</option>
            <option value="duration">Duration (Shortest)</option>
            <option value="score">Score (Highest)</option>
          </select>
        </div>

        {/* Filter by Price */}
        <div className="flex items-center gap-4 mt-4 md:mt-0 bg-white border border-gray-200 rounded-xl px-4 py-2">
          <label htmlFor="maxPrice" className="font-medium text-gray-700">
            Max Price:
          </label>
          <input
            id="maxPrice"
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Enter max price"
            className="border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

      </div>

      {/* Flight Cards */}
      {filteredFlights.length > 0 ? (
        filteredFlights.map((itinerary) => (
          <FlightCard
            key={itinerary.id}
            itinerary={itinerary}
            legs={legs}
            places={places}
            carriers={carriers}
            agents={agents || []}
          />
        ))
      ) : (
        sortOption || maxPrice || selectedCarrier ? 
          <div className="text-center text-gray-500">No flights match your criteria.</div> :
          renderSkeletonLoader()
      )}
    </div>
  );
};

export default Flights;