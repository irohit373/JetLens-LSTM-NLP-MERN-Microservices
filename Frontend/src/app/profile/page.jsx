"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";

export default function ProfilePage() {
  
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Logout function
  const logout = async () => {
    try {
      console.log("Logging out...");
      await axios.get("api/users/logout");

      console.log("Logout successful");
      toast.success("Logout successful");
      
      console.log("Redirecting to login page");
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed");
    }
  };

  // Fetch user data
  const getUser = async () => {
    try {
      console.log("Fetching user data...");
      const response = await axios.get("/api/users/customer");

      console.log(response.data);
      setData(response.data.data._id);
      toast.success("User data fetched successfully");

    } catch (error) {

      console.error("Error fetching user data:", error);
      toast.error("Failed to fetch user data");
    }
  }

  useEffect(() => {
    getUser();
  }, []);


  return (
    <div className="flex h-screen justify-center items-center bg-gradient-to-r from-blue-400 to-white">
      <Head>
        <title>Profile - Jetlens</title>
      </Head>
      <div className="bg-white p-8 rounded-md shadow-lg w-96">
        <div className="flex justify-start mb-4">
          <h2 className="text-2xl font-bold text-blue-600">{loading ? "Loading" : "Jetlens"}</h2>
        </div>
        <Link href={`/profile/${data}`}><h2 className="text-lg font-medium text-gray-600 mb-4">Your Profile {data}</h2></Link>
        {/* Profile content goes here */}

        {/* Logout Button Goes here */}
        <button
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          onClick={logout}
        >
          Logout
        </button>

      </div>
    </div>
  );
}

