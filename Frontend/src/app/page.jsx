'use client';
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { FlightSearchForm } from "@/components/FlightSearchForm";
import Flights from "@/components/Flights";
import Footer from "@/components/Footer";
import PromotionalBanner from "@/components/PromotionalBanner";

export default function Home() {
  const [searchParams, setSearchParams] = useState(null);

  const handleSearch = (params) => {
    setSearchParams(params);
  };

  return (
    <div>
      <Navbar />
      <main className="flex flex-col bg-gradient-to-r from-blue-400 to-amber-50 items-center py-10">
        <FlightSearchForm id="Searchbox" onSearch={handleSearch} />
      </main>

      <div className="container mx-auto px-4">
        <PromotionalBanner 
          imageSrc="/sky.jpg" 
          imageAlt="Special Offer"
          headline="Search Your"
          highlightedText=" Flights"
          endText=" Here"
          subheading="Book your flights with us and enjoy exclusive offers!"
          buttonText="Search Flights Here"
          buttonLink="#Searchbox"
        />
      </div>

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
