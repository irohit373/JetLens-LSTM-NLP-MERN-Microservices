'use client';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { ChevronUpDownIcon, GlobeAltIcon, CalendarIcon, UserGroupIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { useDebounce } from '@/hooks/useDebounce';
import { SearchCombobox } from '@/components/SearchCombobox';
import axios from 'axios';

export const FlightSearchForm = ({ onSearch, initialAirports = [] }) => {
  const [fromQuery, setFromQuery] = useState('');
  const [toQuery, setToQuery] = useState('');
  const [selectedFrom, setSelectedFrom] = useState(null);
  const [selectedTo, setSelectedTo] = useState(null);
  const [departureDate, setDepartureDate] = useState('');
  const [travelers, setTravelers] = useState(1);
  const [airports, setAirports] = useState(initialAirports);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const debouncedFromQuery = useDebounce(fromQuery, 300);
  const debouncedToQuery = useDebounce(toQuery, 300);

  const filteredFromAirports = useMemo(() => {
    if (!debouncedFromQuery) return [];
    const searchTerm = debouncedFromQuery.toLowerCase();
    return airports.filter((airport) =>
      airport.searchIndex.includes(searchTerm)
    ).slice(0, 100);
  }, [debouncedFromQuery, airports]);

  const filteredToAirports = useMemo(() => {
    if (!debouncedToQuery) return [];
    const searchTerm = debouncedToQuery.toLowerCase();
    return airports.filter((airport) =>
      airport.searchIndex.includes(searchTerm)
    ).slice(0, 100);
  }, [debouncedToQuery, airports]);

  const loadAirports = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/data/airports.json');
      const data = response.data;
      setAirports(data.map((airport) => ({
        ...airport,
        searchIndex: `${airport.city} ${airport.name} ${airport.code}`.toLowerCase(),
      })));
    } catch (error) {
      console.error('Error loading airports:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAirports();
  }, [loadAirports]);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!selectedFrom || !selectedTo || !departureDate) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSearching(true);

    try {
      const response = await axios.get('/api/flights', {
        params: {
          from: selectedFrom.code, // Use the airport code
          to: selectedTo.code,     // Use the airport code
          date: departureDate,
          travelers,
        },
      });

      console.log("Flight Data Send Successfully and Query Started on Server.");
      // Pass search parameters to the parent component
      onSearch({ from: selectedFrom.code, to: selectedTo.code, date: departureDate });
    } catch (error) {
      console.error('Error searching for flights:', error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="bg-white/40 backdrop-blur-sm rounded-2xl py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Perfect Flight
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Search and compare flights across thousands of destinations worldwide.
          </p>
        </div>

        <form className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <SearchCombobox
              airports={filteredFromAirports}
              selected={selectedFrom}
              onSelect={setSelectedFrom}
              query={fromQuery}
              onQueryChange={setFromQuery}
              label="From"
              icon={<GlobeAltIcon className="w-5 h-5 mr-2 text-blue-600" />}
              loading={isLoading}
            />

            <SearchCombobox
              airports={filteredToAirports}
              selected={selectedTo}
              onSelect={setSelectedTo}
              query={toQuery}
              onQueryChange={setToQuery}
              label="To"
              icon={<GlobeAltIcon className="w-5 h-5 mr-2 text-blue-600" />}
              loading={isLoading}
            />

            {/* Date Picker */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <CalendarIcon className="w-5 h-5 mr-2 text-blue-600" />
                Departure
              </label>
              <input
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border-none bg-gray-50/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white appearance-none"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            {/* Travelers */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <UserGroupIcon className="w-5 h-5 mr-2 text-blue-600" />
                Travelers
              </label>
              <div className="flex items-center bg-gray-50/50 rounded-lg px-3">
                <button
                  type="button"
                  onClick={() => setTravelers(Math.max(1, travelers - 1))}
                  className="p-2 text-gray-500 hover:text-blue-600"
                >
                  -
                </button>
                <input
                  type="number"
                  value={travelers}
                  readOnly
                  className="w-full py-3 text-center bg-transparent"
                />
                <button
                  type="button"
                  onClick={() => setTravelers(travelers + 1)}
                  className="p-2 text-gray-500 hover:text-blue-600"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSearch}
            disabled={isSearching}
            className={`mt-8 w-full bg-gradient-to-r from-blue-600 to-sky-600 text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center ${
              isSearching ? 'opacity-90 cursor-not-allowed' : ''
            }`}
          >
            {isSearching ? (
              <div className="flex items-center space-x-2">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Searching for the best flights...</span>
              </div>
            ) : (
              <div className="flex items-center">
                <span>Search Flights</span>
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </div>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};