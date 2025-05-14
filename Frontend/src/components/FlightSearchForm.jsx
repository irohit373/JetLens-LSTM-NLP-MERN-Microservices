'use client';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { ChevronUpDownIcon, GlobeAltIcon, CalendarIcon, UserGroupIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { useDebounce } from '@/hooks/useDebounce';
import { SearchCombobox } from '@/components/SearchCombobox';

export const FlightSearchForm = ({ initialAirports = [] }) => {
  const [fromQuery, setFromQuery] = useState('');
  const [toQuery, setToQuery] = useState('');
  const [selectedFrom, setSelectedFrom] = useState(null);
  const [selectedTo, setSelectedTo] = useState(null);
  const [departureDate, setDepartureDate] = useState('');
  const [travelers, setTravelers] = useState(1);
  const [airports, setAirports] = useState(initialAirports);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedFromQuery = useDebounce(fromQuery, 300);
  const debouncedToQuery = useDebounce(toQuery, 300);
 
  const filteredFromAirports = useMemo(() => {
    if (!debouncedFromQuery) return [];
    const searchTerm = debouncedFromQuery.toLowerCase();
    return airports.filter(airport => 
      airport.searchIndex.includes(searchTerm)
    )
     .slice(0, 100);
  }, [debouncedFromQuery, airports]);

  const filteredToAirports = useMemo(() => {
    if (!debouncedToQuery) return [];
    const searchTerm = debouncedToQuery.toLowerCase();
    return airports.filter(airport => 
      airport.searchIndex.includes(searchTerm)
    )
     .slice(0, 100);
  }, [debouncedToQuery, airports]);

  const loadAirports = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/data/airports.json');
      const data = await response.json();
      setAirports(data.map(airport => ({
        ...airport,
        searchIndex: `${airport.city} ${airport.name} ${airport.code}`.toLowerCase()
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

  const handleSearch = (e) => {
    e.preventDefault();
    console.log({
      from: selectedFrom,
      to: selectedTo,
      date: departureDate,
      travelers
    });
  };

  return (
    <div className=" bg-white/40 backdrop-blur-sm rounded-2xl py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Perfect Flight
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Search and compare flights across thousands of destinations worldwide.
          </p>
        </div>

        <form onSubmit={handleSearch} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
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
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border-none bg-gray-50/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white appearance-none date-picker-custom"
                  min={new Date().toISOString().split('T')[0]}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Travelers */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <UserGroupIcon className="w-5 h-5 mr-2 text-blue-600" />
                Travelers
              </label>
              <div className="flex items-center bg-gray-50/50 rounded-lg px-3 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500 transition-all">
                <button
                  type="button"
                  onClick={() => setTravelers(Math.max(1, travelers - 1))}
                  className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                >
                  -
                </button>
                <input
                  type="number"
                  value={travelers}
                  readOnly
                  className="w-full py-3 text-center bg-transparent focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setTravelers(travelers + 1)}
                  className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="mt-8 w-full bg-gradient-to-r from-blue-600 to-sky-600 text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center"
          >
            Search Flights
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </button>
        </form>
      </div>
    </div>
  );
};