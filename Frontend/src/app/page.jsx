'use client';
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { FlightSearchForm } from "@/components/FlightSearchForm";
import Flights from "@/components/Flights";
import Footer from "@/components/Footer";

export default function Home() {
  const [searchParams, setSearchParams] = useState(null);

  const handleSearch = (params) => {
    setSearchParams(params);
  };

  return (
    <div>
      <Navbar />
      <main className="flex flex-col bg-gradient-to-r from-blue-400 to-amber-50 items-center py-10">
        <FlightSearchForm onSearch={handleSearch} />
      </main>

      <div className="flex flex-col bg-gradient-to-r from-blue-400 to-amber-50 items-center py-10">
        {searchParams && (
          <Flights
            from={searchParams.from}
            to={searchParams.to}
            date={searchParams.date}
          />
        )}
      </div>
      <Footer />

    </div>
  );
}
