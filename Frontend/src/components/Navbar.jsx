"use client";
import react, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar = () => {
  const router = useRouter();

  const signup = () => {
    router.push("/signup");
  };

  const login = () => {
    router.push("/login");
  };


  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/users/mee");

        if (response.status === 200) {
          const data = response.data;
          setIsLoggedIn(true);
          setUsername(data.data.username); // Extract username from the response
        } else {
          setIsLoggedIn(false);
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoggedIn(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <nav className="bg-blue-50 sticky top-0 left-0 w-full z-50 text-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left Section - Logo and Brand Name */}
          <div className="flex items-center">
            <img
              src="/favicon.png" // Replace with your logo path
              alt="Logo"
              className="h-8 w-8 rounded-full"
            />
            <span className="ml-2 text-xl text-blue-800 hidden sm:inline">JetLens</span>
          </div>

          {/* Right Section - Navigation Items */}
          <div className="flex items-center gap-4">
            {/* Heart Button */}
            <button className="p-2 rounded-full hover:bg-rose-200 transition-colors">
              <svg
                className="w-6 h-6 text-red-500 hover:"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>

            {/* Conditional Rendering based on Authentication */}
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <span className="text-gray-700">Welcome, {username}</span>
                <button
                  className="bg-sky-200 hover:bg-rose-200 px-4 py-2 rounded-lg transition-colors"
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <button
                  className="bg-sky-200 hover:bg-sky-400 px-4 py-2 rounded-lg transition-colors"
                  onClick={login}
                >
                  Login
                </button>
                <button
                  className="bg-sky-200 hover:bg-sky-400 px-4 py-2 rounded-lg transition-colors"
                  onClick={signup}
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
