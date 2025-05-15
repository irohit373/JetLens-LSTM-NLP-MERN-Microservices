'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function Signup() {

    const router = useRouter();

    const [user, setUser] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [buttonDisabled, setButtonDisabled] = useState(false);

    useEffect(() => {
      if (user.username.length > 0 && user.email.length > 0 && user.password.length > 0) {
        setButtonDisabled(false);
      } else {
        setButtonDisabled(true);
      }
    }, [user]);


    const [loading, setLoading] = useState(false);


    const onSignup = async () => {
      event.preventDefault();
      
      try {
        setLoading(true);
        
        console.log("Data Collected. Ready to Send Server");
        
        console.log("connecting to server");
        const response = await axios.post('/api/users/signup', user)

        console.log("Signup Response", response);
        toast.success("User Created Successfully");
        
        console.log("redirecting to login");
        router.push('/login');

      } catch (error) {
        
        console.log("SignUp Error", error);
        toast.error(error.response.data.message);
      
      }finally{
        setLoading(false);
      }
    }
    
  return (
    <div className="flex h-screen justify-center items-center bg-gradient-to-r from-blue-400 to-white">
      <Head>
        <title>Signup - Jetlens</title>
      </Head>
      <div className="bg-white p-8 rounded-md shadow-lg w-96">
        <div className="flex justify-start mb-4">
          <h2 className="text-3xl font-bold text-blue-600"> {loading ? " Processing" : "JetLens" }</h2>
        </div>
        <h2 className="text-lg font-medium text-gray-600 mb-4">Create Your Account</h2>
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
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            {/* Email input */}
            <input
              type="email"
              id="email"
              className="block w-full p-2 mt-1 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}

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
              onChange={(e) => setUser({ ...user, password : e.target.value })}

            />
          </div>
          <button
            type="button"
            className='w-full bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            onClick={onSignup}
            disabled={buttonDisabled}
         >
            Signup
          </button>
          <Link href="/login">
            <p className="text-sm text-blue-500 hover:text-blue-700 mt-4 text-center">
              Already have an account? Login
            </p>
            </Link>
        </form>
      </div>
    </div>
  );
}
