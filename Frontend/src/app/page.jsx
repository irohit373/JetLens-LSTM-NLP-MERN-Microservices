import React from 'react';
import Navbar from '../components/Navbar'
// import FlightSearchForm from '@/components/main';
import { FlightSearchForm } from '../components/FlightSearchForm';

export default function Home() {
  return (
    <div className=''>
      {/* Navbar */}
      <Navbar />
      <main className='flex flex-col bg-gradient-to-r from-blue-400 items-center h-full py-10'>
        <FlightSearchForm />
      </main>

      <div> 
          
        </div>
    </div>
  );
}