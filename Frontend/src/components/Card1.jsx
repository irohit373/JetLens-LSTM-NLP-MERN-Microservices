'use client';
import React, {useState, useEffect} from "react";
import { Clock, MapPin, Plane } from "lucide-react";
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';


export const Card2 = () => {
  

  return (
    <div className="w-full max-w-xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="bg-blue-50 p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Plane className="text-blue-600" size={24} />
          <span className="text-sm font-semibold text-blue-800">GoIndia</span>
        </div>
      </div>

      {/* Flight Details */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">4:50 PM</h2>
            <p className="text-sm text-gray-500">BHO • May 14</p>
          </div>
          <div className="flex items-center text-gray-500">
            <Clock className="mr-2" size={16} />
            <span className="text-sm">4h 20m</span>
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-bold text-gray-800">9:10 PM</h2>
            <p className="text-sm text-gray-500">IDR • May 14</p>
          </div>
        </div>

        {/* Stop Information */}
        <div className="relative my-4">
          <div className="border-t border-dashed border-gray-300"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs text-gray-500">
            1 stop
          </div>
        </div>

        {/* Additional Info */}
        <div className="flex justify-between items-center text-sm text-gray-600">
          <div className="flex items-center">
            <span>INR</span>
          </div>
          <div className="font-semibold items-end text-gray-800">11,433.58</div>
        </div>
      </div>

      {/* Action Button */}
      <div className="p-4 bg-gray-50">
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
          View details
        </button>
      </div>
    </div>
  );
};

export const Card1 = () => {
  const [isLiked, setIsLiked] = useState(false);
  console.log(isLiked);
  const handleLike = () => {
    setIsLiked(!isLiked);
  };
  return (
    <div className="max-w-2xl my-6 mx-auto bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        {/* Header with badges */}
        <div className="flex items-center justify-between pb-4">
          <div className="flex items-center space-x-2">
            <Plane className="text-blue-600" size={24} />
            <span className="text-sm font-semibold text-blue-800">GoIndia</span>
          </div>
          {/* Like button */}
          <button 
            onClick={handleLike}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
          >
            {isLiked ? (
          <HeartSolid className="w-6 h-6 text-red-500" />
        ) : (
          <HeartOutline className="w-6 h-6 text-gray-400 hover:text-red-300" />
        )}
          </button>
        </div>

        {/* Flight times and airports */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-left">
            <p className="text-xl font-bold text-gray-900">4:50 PM</p>
            <p className="text-sm text-gray-600">BHO · May 14</p>
          </div>

          <div className="text-center mx-4">
            <svg
              className="w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              ></path>
            </svg>
            <p className="text-sm text-gray-600 mt-1">1 stop · 4h 20m</p>
          </div>

          <div className="text-right">
            <p className="text-xl font-bold text-gray-900">9:10 PM</p>
            <p className="text-sm text-gray-600">IDR · May 14</p>
          </div>
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between">
          <div className="text-left">
            <p className="text-2xl font-bold text-gray-900">INR11,433.58</p>
            <p className="text-sm text-gray-600">
              Total price for all travelers
            </p>
          </div>
          <button 
          onClick={handleLike}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
          >
            View details
          </button>
        </div>
      </div>
    </div>
  );
};
