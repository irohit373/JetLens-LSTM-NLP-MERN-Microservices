'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

// Create a component that uses useSearchParams
function SearchResultsContent() {
  const searchParams = useSearchParams();
  const [results, setResults] = useState([]);
  
  const from = searchParams.get('from');
  const to = searchParams.get('to');
  const date = searchParams.get('date');
  const travelers = searchParams.get('travelers');

  useEffect(() => {
    async function fetchFlights() {
      try {
        const response = await fetch(`/api/flights?from=${from}&to=${to}&date=${date}&travelers=${travelers}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch flights');
        }
        
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error('Error fetching flights:', error);
      }
    }

    if (from && to && date) {
      fetchFlights();
    }
  }, [from, to, date, travelers]);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">
        Flight Results: {from} to {to}
      </h1>
      <p className="mb-6">
        {date} • {travelers} {parseInt(travelers) === 1 ? 'traveler' : 'travelers'}
      </p>

      {results.length > 0 ? (
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

// Main component with Suspense boundary
export default function SearchResults() {
  return (
    <Suspense fallback={<div>Loading search results...</div>}>
      <SearchResultsContent />
    </Suspense>
  );
}