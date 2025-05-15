import React from "react";
import Navbar from "@/components/Navbar";
import { FlightSearchForm } from "@/components/FlightSearchForm";
import Flights from "@/components/Flights";

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <main className="flex flex-col bg-gradient-to-r from-blue-400 to-amber-50 items-center py-10">
        <FlightSearchForm />
      </main>

      <div className="flex flex-col bg-gradient-to-r from-blue-400 to-amber-50 items-center py-10">
        <Flights />
      </div>
    </div>
  );
}
