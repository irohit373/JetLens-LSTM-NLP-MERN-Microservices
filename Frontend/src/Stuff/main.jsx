"use client";
import react, { useState, useEffect } from "react";
import { Combobox } from "@headlessui/react";
import {
  ChevronUpDownIcon,
  GlobeAltIcon,
  CalendarIcon,
  UserGroupIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { Virtuoso } from "react-virtuoso";
import { debounce } from "lodash";

// Memoized Airport Option Component
const AirportOption = memo(({ airport, active }) => (
  <div
    className={`px-4 py-3 ${
      active ? "bg-blue-50" : "text-gray-900"
    } cursor-pointer transition-colors`}
  >
    <div className="flex flex-col">
      <span className="text-lg font-bold text-gray-900">{airport.city}</span>
      <div className="flex items-center gap-2">
        <span className="text-base font-medium text-blue-600">
          {airport.code}
        </span>
        <span className="text-sm text-gray-500 truncate">{airport.name}</span>
      </div>
    </div>
  </div>
));

const FlightSearchForm = () => {
  const [fromQuery, setFromQuery] = useState("");
  const [toQuery, setToQuery] = useState("");
  const [selectedFrom, setSelectedFrom] = useState(null);
  const [selectedTo, setSelectedTo] = useState(null);
  const [departureDate, setDepartureDate] = useState("");
  const [travelers, setTravelers] = useState(1);
  const [airports, setAirports] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Debounced search
  const debouncedSearch = useCallback(
    debounce((query, type) => {
      // Your search logic here
      <Combobox.Options className="absolute z-20 mt-2 w-full max-h-[300px] overflow-auto rounded-xl bg-white shadow-lg ring-1 ring-black/5">
      {isLoading ? (
        <div className="px-4 py-2 text-gray-500">Loading...</div>
      ) : filteredFromAirports.length === 0 ? (
        <div className="px-4 py-2 text-gray-500">No airports found</div>
      ) : (
        <Virtuoso
          data={filteredFromAirports}
          itemContent={renderAirport}
          totalCount={filteredFromAirports.length}
          overscan={20}
          style={{ height: '300px' }}
        />
      )}
    </Combobox.Options>
    }, 300),
    []
  );

  // Memoized filtered airports
  const filteredFromAirports = useMemo(() => {
    if (!fromQuery) return [];
    const searchTerm = fromQuery.toLowerCase();
    return airports
      .filter((airport) => airport.searchIndex.includes(searchTerm))
      .slice(0, 100); // Limit to top 100 results
  }, [fromQuery, airports]);

  // Preprocess airports data
  useEffect(() => {
    const loadAirports = async () => {
      const response = await fetch("/data/airports.json");
      const data = await response.json();

      // Create search index
      const processed = data.map((airport) => ({
        ...airport,
        searchIndex:
          `${airport.city} ${airport.name} ${airport.code}`.toLowerCase(),
      }));

      setAirports(processed);
    };
    loadAirports();
  }, []);

  // Optimized render function for virtuoso
  const renderAirport = (index, airport, active) => (
    <Combobox.Option key={airport.code} value={airport}>
      {({ active }) => <AirportOption airport={airport} active={active} />}
    </Combobox.Option>
  );

  // Sample airport data - replace with API call
  // const sampleAirports = [
  //   {
  //     code: "JFK",
  //     name: "John F. Kennedy International Airport",
  //     city: "New York",
  //   },
  //   {
  //     code: "LAX",
  //     name: "Los Angeles International Airport",
  //     city: "Los Angeles",
  //   },
  //   { code: "ORD", name: "O'Hare International Airport", city: "Chicago" },
  //   {
  //     code: "ATL",
  //     name: "Hartsfield-Jackson Atlanta International Airport",
  //     city: "Atlanta",
  //   },
  //   {
  //     code: "DFW",
  //     name: "Dallas/Fort Worth International Airport",
  //     city: "Dallas",
  //   },
  //   { code: "DEN", name: "Denver International Airport", city: "Denver" },
  //   {
  //     code: "SFO",
  //     name: "San Francisco International Airport",
  //     city: "San Francisco",
  //   },
  //   {
  //     code: "SEA",
  //     name: "Seattle-Tacoma International Airport",
  //     city: "Seattle",
  //   },
  //   {
  //     code: "LAS",
  //     name: "Harry Reid International Airport",
  //     city: "Las Vegas",
  //   },
  //   { code: "MIA", name: "Miami International Airport", city: "Miami" },
  //   { code: "BOS", name: "Boston Logan International Airport", city: "Boston" },
  //   {
  //     code: "PHX",
  //     name: "Phoenix Sky Harbor International Airport",
  //     city: "Phoenix",
  //   },
  //   {
  //     code: "IAH",
  //     name: "George Bush Intercontinental Airport",
  //     city: "Houston",
  //   },
  //   {
  //     code: "MSP",
  //     name: "Minneapolis-Saint Paul International Airport",
  //     city: "Minneapolis",
  //   },
  //   {
  //     code: "DTW",
  //     name: "Detroit Metropolitan Wayne County Airport",
  //     city: "Detroit",
  //   },
  //   {
  //     code: "PHL",
  //     name: "Philadelphia International Airport",
  //     city: "Philadelphia",
  //   },
  //   {
  //     code: "CLT",
  //     name: "Charlotte Douglas International Airport",
  //     city: "Charlotte",
  //   },
  //   { code: "MCO", name: "Orlando International Airport", city: "Orlando" },
  //   {
  //     code: "DEL",
  //     name: "Indira Gandhi International Airport",
  //     city: "New Delhi",
  //   },
  //   {
  //     code: "BOM",
  //     name: "Chhatrapati Shivaji Maharaj International Airport",
  //     city: "Mumbai",
  //   },
  //   { code: "MAA", name: "Chennai International Airport", city: "Chennai" },
  //   {
  //     code: "BLR",
  //     name: "Kempegowda International Airport",
  //     city: "Bengaluru",
  //   },
  //   {
  //     code: "HYD",
  //     name: "Rajiv Gandhi International Airport",
  //     city: "Hyderabad",
  //   },
  //   {
  //     code: "CCU",
  //     name: "Netaji Subhas Chandra Bose International Airport",
  //     city: "Kolkata",
  //   },
  //   { code: "COK", name: "Cochin International Airport", city: "Kochi" },
  //   { code: "PNQ", name: "Pune International Airport", city: "Pune" },
  //   {
  //     code: "AMD",
  //     name: "Sardar Vallabhbhai Patel International Airport",
  //     city: "Ahmedabad",
  //   },
  //   { code: "GOI", name: "Dabolim Airport", city: "Goa" },
  //   { code: "JAI", name: "Jaipur International Airport", city: "Jaipur" },
  //   {
  //     code: "LKO",
  //     name: "Chaudhary Charan Singh International Airport",
  //     city: "Lucknow",
  //   },
  //   {
  //     code: "IXC",
  //     name: "Chandigarh International Airport",
  //     city: "Chandigarh",
  //   },
  //   {
  //     code: "TRV",
  //     name: "Trivandrum International Airport",
  //     city: "Thiruvananthapuram",
  //   },
  //   { code: "IXM", name: "Madurai Airport", city: "Madurai" },
  //   {
  //     code: "IXZ",
  //     name: "Veer Savarkar International Airport",
  //     city: "Port Blair",
  //   },
  //   {
  //     code: "GAU",
  //     name: "Lokpriya Gopinath Bordoloi International Airport",
  //     city: "Guwahati",
  //   },
  //   {
  //     code: "PAT",
  //     name: "Jay Prakash Narayan International Airport",
  //     city: "Patna",
  //   },
  //   {
  //     code: "BBI",
  //     name: "Biju Patnaik International Airport",
  //     city: "Bhubaneswar",
  //   },
  //   { code: "IXR", name: "Birsa Munda Airport", city: "Ranchi" },
  //   { code: "IXB", name: "Bagdogra Airport", city: "Siliguri" },
  //   { code: "IDR", name: "Devi Ahilyabai Holkar Airport", city: "Indore" },
  //   {
  //     code: "NAG",
  //     name: "Dr. Babasaheb Ambedkar International Airport",
  //     city: "Nagpur",
  //   },
  //   {
  //     code: "VTZ",
  //     name: "Visakhapatnam International Airport",
  //     city: "Visakhapatnam",
  //   },
  //   { code: "IXJ", name: "Jammu Airport", city: "Jammu" },
  //   {
  //     code: "SXR",
  //     name: "Sheikh ul-Alam International Airport",
  //     city: "Srinagar",
  //   },
  //   {
  //     code: "VGA",
  //     name: "Vijayawada International Airport",
  //     city: "Vijayawada",
  //   },
  //   { code: "IXE", name: "Mangalore International Airport", city: "Mangalore" },
  //   {
  //     code: "TRZ",
  //     name: "Tiruchirapalli International Airport",
  //     city: "Tiruchirappalli",
  //   },
  //   {
  //     code: "CJB",
  //     name: "Coimbatore International Airport",
  //     city: "Coimbatore",
  //   },
  //   { code: "IXL", name: "Kushok Bakula Rimpochee Airport", city: "Leh" },
  //   { code: "IXU", name: "Aurangabad Airport", city: "Aurangabad" },
  //   {
  //     code: "VNS",
  //     name: "Lal Bahadur Shastri International Airport",
  //     city: "Varanasi",
  //   },
  //   { code: "IXD", name: "Allahabad Airport", city: "Prayagraj" },
  //   { code: "RPR", name: "Swami Vivekananda Airport", city: "Raipur" },
  //   { code: "DIB", name: "Dibrugarh Airport", city: "Dibrugarh" },
  //   { code: "IMF", name: "Imphal International Airport", city: "Imphal" },
  //   { code: "JLR", name: "Jabalpur Airport", city: "Jabalpur" },
  //   { code: "BDQ", name: "Vadodara Airport", city: "Vadodara" },
  //   { code: "IXA", name: "Maharaja Bir Bikram Airport", city: "Agartala" },
  //   { code: "AGX", name: "Agatti Airport", city: "Lakshadweep" },
  //   { code: "DMU", name: "Dimapur Airport", city: "Dimapur" },
  //   { code: "KQH", name: "Kishangarh Airport", city: "Ajmer" },
  //   { code: "IXG", name: "Belgaum Airport", city: "Belgaum" },
  //   { code: "BHO", name: "Raja Bhoj Airport", city: "Bhopal" },
  //   { code: "KNU", name: "Kanpur Airport", city: "Kanpur" },
  //   { code: "KLH", name: "Kolhapur Airport", city: "Kolhapur" },
  //   { code: "IXI", name: "North Lakhimpur Airport", city: "Lilabari" },
  //   { code: "DED", name: "Dehradun Airport", city: "Dehradun" },
  //   { code: "SAG", name: "Shirdi Airport", city: "Shirdi" },
  // ];

  // Load airport data
  // useEffect(() => {
  //   const loadAirports = async () => {
  //     try {
  //       console.log("loading started");

  //       const response = await fetch('/data/airporrts.json');
  //       console.log("loading finished");
  //       const data = await response.json();
  //       setAirports(data);
  //       console.log(data[1]);
  //     } catch (error) {
  //       console.error('Error loading airport data:', error);
  //       // Fallback data
  //       setAirports([
  //         {
  //           code: 'JFK',
  //           name: 'John F. Kennedy International Airport',
  //           city: 'New York',
  //           country: 'United States'
  //         },
  //         {
  //           code: 'LAX',
  //           name: 'Los Angeles International Airport',
  //           city: 'Los Angeles',
  //           country: 'United States'
  //         }
  //       ]);
  //     }
  //   };
  //   loadAirports();
  // }, []);

  // useEffect(() => {
  //   setAirports(sampleAirports);
  // }, []);

  // const filteredFromAirports = airports.filter((airport) =>
  //   `${airport.city} ${airport.name} ${airport.code}`
  //     .toLowerCase()
  //     .includes(fromQuery.toLowerCase())
  // );

  // const filteredToAirports = airports.filter((airport) =>
  //   `${airport.city} ${airport.name} ${airport.code}`
  //     .toLowerCase()
  //     .includes(toQuery.toLowerCase())
  // );

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic
    console.log({
      from: selectedFrom,
      to: selectedTo,
      date: departureDate,
      travelers: travelers,
    });
  };

  return (
    <div className="bg-white/60 rounded-2xl py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl text-left font-bold  text-gray-900 mb-4">
            Find Your Perfect Flight
          </h1>
          <p className="text-lg text-left text-gray-600">
            Explore thousands of destinations across the globe. Compare prices
            from major airlines and book your next adventure with confidence.
            Your journey begins here.
          </p>
        </div>

        <form
          onSubmit={handleSearch}
          className="bg-white/40 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* From Airport */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <GlobeAltIcon className="w-5 h-5 mr-2 text-blue-600" />
                From
              </label>
              <Combobox value={selectedFrom} onChange={setSelectedFrom}>
                <div className="relative">
                  <Combobox.Input
                    className="w-full pl-4 pr-4 py-3 border-none bg-gray-50/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                    displayValue={(airport) =>
                      airport ? `${airport.city} (${airport.code})` : ""
                    }
                    onChange={(e) => setFromQuery(e.target.value)}
                    placeholder="City or airport"
                  />
                  <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <ChevronUpDownIcon className="w-5 h-5 text-gray-400" />
                  </Combobox.Button>
                  <Combobox.Options className="absolute z-20 mt-2 w-full max-h-[300px] overflow-auto rounded-xl bg-white shadow-lg ring-1 ring-black/5">
                    {isLoading ? (
                      <div className="px-4 py-2 text-gray-500">Loading...</div>
                    ) : filteredFromAirports.length === 0 ? (
                      <div className="px-4 py-2 text-gray-500">
                        No airports found
                      </div>
                    ) : (
                      <Virtuoso
                        data={filteredFromAirports}
                        itemContent={renderAirport}
                        totalCount={filteredFromAirports.length}
                        overscan={20}
                        style={{ height: "300px" }}
                      />
                    )}
                  </Combobox.Options>
                </div>
              </Combobox>
            </div>

            {/* To Airport */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <GlobeAltIcon className="w-5 h-5 mr-2 text-blue-600" />
                To
              </label>
              <Combobox value={selectedTo} onChange={setSelectedTo}>
                <div className="relative">
                  <Combobox.Input
                    className="w-full pl-4 pr-2 py-3 border-none bg-gray-50/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                    displayValue={(airport) =>
                      airport ? `${airport.city} (${airport.code})` : ""
                    }
                    onChange={(e) => setToQuery(e.target.value)}
                    placeholder="City or airport"
                  />
                  <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <ChevronUpDownIcon className="w-5 h-5 text-gray-400" />
                  </Combobox.Button>
                  <Combobox.Options className="absolute z-10 mt-2 w-full max-h-60 overflow-auto rounded-xl bg-white shadow-lg ring-1 ring-black/5">
                    {filteredToAirports.map((airport) => (
                      <Combobox.Option
                        key={airport.code}
                        value={airport}
                        className={({ active }) =>
                          `px-4 py-3 ${
                            active ? "bg-blue-50" : "text-gray-900"
                          } cursor-pointer transition-colors`
                        }
                      >
                        <div className="flex flex-col">
                          <span className="text-lg font-bold text-gray-900">
                            {airport.city}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-base font-medium text-blue-600">
                              {airport.code}
                            </span>
                            <span className="text-sm text-gray-500 truncate">
                              {airport.name}
                            </span>
                          </div>
                        </div>
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                </div>
              </Combobox>
            </div>

            {/* Date Picker */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <CalendarIcon className="w-5 h-5 mr-2 text-blue-600" />
                Departure
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-none bg-gray-50/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
                <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
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
export default FlightSearchForm;
