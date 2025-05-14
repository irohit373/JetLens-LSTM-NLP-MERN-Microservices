"use client";
import React, { useEffect, useState } from "react";
import { Card1 } from "@/components/Card1";

const Flights = () => {
  return (
    <div className="flex flex-col items-center bg-gradient-to-r from-blue-400 to-amber-50 py-10">
      <div className="bg-white/40 backdrop-blur-sm rounded-2xl w-3xl py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Perfect Flight's For You
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              flights across thousands of Providers worldwide.
            </p>
          </div>

          <Card1 />
          <Card1 />
          <Card1 />
          <Card1 />
          <Card1 />
          <Card1 />
          <Card1 />
          <Card1 />
          <Card1 />
        </div>
      </div>
    </div>
  );
};

export default Flights;
