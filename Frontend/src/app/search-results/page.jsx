2'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function SearchResults() {
  const [flights, setFlights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const searchParams = useSearchParams();
  
  const from = searchParams.get('from');
  const to = searchParams.get('to');
  const date = searchParams.get('date');
  const travelers = searchParams.get('travelers');

  useEffect(() => {
    async function fetchFlights() {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/flights?from=${from}&to=${to}&date=${date}&travelers=${travelers}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch flights');
        }
        
        const data = await response.json();
        setFlights(data);
      } catch (error) {
        console.error('Error fetching flights:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    if (from && to && date) {
      fetchFlights();
    }
  }, [from, to, date, travelers]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Searching for Flights</h2>
          <p>Looking for flights from {from} to {to} on {date}</p>
          {/* You could add a nice loading animation here */}
          <div className="mt-4 animate-pulse">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-red-500">
          <h2 className="text-2xl font-semibold mb-4">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">
        Flight Results: {from} to {to}
      </h1>
      <p className="mb-6">
        {date} • {travelers} {parseInt(travelers) === 1 ? 'traveler' : 'travelers'}
      </p>

      {flights.length > 0 ? (
        <div className="grid gap-6">
          {/* Render your flight results here */}
          {/* This will depend on the structure of your API response */}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">No flights found for your search criteria.</p>
        </div>
      )}
    </div>
  );
}