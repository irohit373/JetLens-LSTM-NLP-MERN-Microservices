'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Head from 'next/head';
import { Axios } from 'axios';

export default function Login() {
    const [user, setUser] = useState({
        username: '',
        password: ''
    });

    const onLogin = async (e) => {

    }

  return (
    <div className="flex h-screen justify-center items-center bg-gradient-to-r from-blue-100 to-white">
      <Head>
        <title>Login - Jetlens</title>
      </Head>
      <div className="bg-white p-8 rounded-md shadow-lg w-96">
        <div className="flex justify-start mb-4">
          <h2 className="text-2xl font-bold text-blue-600">Jetlens</h2>
        </div>
        <h2 className="text-lg font-medium text-gray-600 mb-4">Log into Your Account</h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              username
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
              onChange={(e) => setUser({ ...user, password : e.target.value })}

            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={onLogin}
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