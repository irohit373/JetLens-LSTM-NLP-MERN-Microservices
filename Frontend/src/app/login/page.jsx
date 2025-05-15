"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Head from "next/head";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const router = useRouter();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    if (user.username.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    event.preventDefault();
    
    try {
      setLoading(true);
      
      console.log("Data Collected. Ready to Send Server");
      console.log("connecting to server");

      const response = await axios.post("/api/users/login", user);
      
      toast.success("Login Successfully");
      console.log("Login Response", response);

      console.log("redirecting to home");
      router.push("/");
      
    } catch (err) {
      console.log("Login Error", err);
      toast.error("error logging in: ", err.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gradient-to-r from-blue-400 to-white">
      <Head>
        <title>Login - Jetlens</title>
      </Head>
      <div className="bg-white p-8 rounded-md shadow-lg w-96">
        <div className="flex justify-start mb-4">
          <h1 className="text-2xl font-bold text-blue-600">
            {loading ? "Processing" : "Jetlens"}
          </h1>
        </div>
        <h2 className="text-lg font-medium text-gray-600 mb-4">
          Log into Your Account
        </h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            {/* Username Input */}
            <input
              type="text"
              id="username"
              className="block w-full p-2 mt-1 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            {/* Password input */}
            <input
              type="password"
              id="password"
              className="block w-full p-2 mt-1 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>
          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={onLogin}
            disabled={buttonDisabled}
          >
            Login
          </button>
          <Link href="/signup">
            <p className="text-sm text-blue-500 hover:text-blue-700 mt-4 text-center">
              Not Have an account? SignUp
            </p>
          </Link>
        </form>
      </div>
    </div>
  );
}
