import "./globals.css";
import React from "react"
import { Metadata } from "next"
import { Inter } from "next/font/google"
import toast, { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "JetLens",
  description: "JetLens - Flight Booking with Chatbot",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
      <Toaster position="bottom-center" />
          
          <div className="flex min-h-screen flex-col">
            <div className="flex-1">{children}</div>
          </div>
      </body>
    </html>
  );
}
       