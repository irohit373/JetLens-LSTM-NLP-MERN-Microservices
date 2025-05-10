// app/page.jsx
import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-sky-600">JetLens</h1>
            </div>
            <div className="flex space-x-4">
              <button className="text-gray-600 hover:text-sky-600">Login</button>
              <button className="bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Flight Search Card */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Find Your Perfect Flight</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
              <input 
                type="text" 
                placeholder="City or Airport" 
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-sky-500 focus:border-sky-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
              <input 
                type="text" 
                placeholder="City or Airport" 
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-sky-500 focus:border-sky-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dates</label>
              <input 
                type="text" 
                placeholder="Select Dates" 
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-sky-500 focus:border-sky-500"
              />
            </div>
          </div>
          
          <button className="bg-sky-600 text-white px-6 py-3 rounded-md hover:bg-sky-700 w-full md:w-auto">
            Search Flights
          </button>
        </div>

        {/* Price Trends Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Price Trends</h2>
          <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
            <p className="text-gray-500">AI-Powered Price Prediction Chart</p>
          </div>
        </div>

        {/* 3D Seat Preview Section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">3D Seat Preview</h2>
          <div className="h-96 bg-gray-100 rounded-md flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-500 mb-4">Interactive Cabin Visualization</p>
              <button className="bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700">
                Explore Seats
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© 2023 JetLens. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-sky-400">Terms</a>
              <a href="#" className="hover:text-sky-400">Privacy</a>
              <a href="#" className="hover:text-sky-400">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}