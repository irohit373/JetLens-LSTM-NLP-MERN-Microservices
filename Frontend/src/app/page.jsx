import React from 'react';
import Navbar from '@/components/Navbar'
// import FlightSearchForm from '@/components/main';
import { FlightSearchForm } from '@/components/FlightSearchForm';
import Flights from '@/components/Flights';
export default function Home() {
  return (
    <div className=''>
      {/* Navbar */}
      <Navbar />
      <main className='flex flex-col bg-gradient-to-r from-blue-400 to-amber-50 items-center py-10'>
        <FlightSearchForm />
      </main>

    {/* flights list here */}
      <div className="">
          <Flights />
        </div>
    </div>
  );
}