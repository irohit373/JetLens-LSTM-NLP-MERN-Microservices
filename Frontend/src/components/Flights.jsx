'use client';
import React, { useState, useEffect } from 'react';
import FlightCard from '@/components/FlightCard/flightCard';

const Flights = ({ from, to, date }) => {
  const [flightData, setFlightData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlightData = async () => {
      try {
        const response = await fetch(`/api/flights?from=${from}&to=${to}&date=${date}`);
        if (!response.ok) {
          throw new Error('No flight data found');
        }
        const { flightData } = await response.json();
        setFlightData(flightData);
      } catch (error) {
        console.error('Error loading flight data:', error);
        setFlightData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchFlightData();
  }, [from, to, date]);

  if (loading) {
    return <div className="text-center">Loading flight data...</div>;
  }

  if (!flightData) {
    return <div className="text-center text-red-500">No flight data available.</div>;
  }

  const { itineraries, legs, places, carriers, agents } = flightData;

  if (!itineraries || !legs || !places || !carriers) {
    return <div className="text-center text-red-500">Invalid flight data structure.</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Available Flights</h1>
      {itineraries.map((itinerary) => (
        <FlightCard 
          key={itinerary.id}
          itinerary={itinerary}
          legs={legs}
          places={places}
          carriers={carriers}
          agents={agents || []}
        />
      ))}
    </div>
  );
};

export default Flights;