
import "./globals.css";
import React from "react"
import Head from "next/head"
import { Inter } from "next/font/google"
import toast, { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "JetLens",
  description: "JetLens - Flight Booking with Chatbot. Book flights, get travel advice, and more.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  canonical: "https://www.jetlens.com",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <title>Jetlens Home</title>
        <link rel="icon" href="/favicon.ipng" />
      </Head>
      <body className={inter.className}>
        {/* Toaster Added Here */}
        <Toaster position="bottom-center" />
        <div>
          {children}
        </div>
      </body>
    </html>
  );
}
       