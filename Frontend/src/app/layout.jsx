import "./globals.css";
import toast, { Toaster } from "react-hot-toast";

export const metadata = {
  title: "JetLens",
  description: "JetLens - Flight Booking with Chatbot",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <Toaster position="bottom-center" />
        {children}
      </body>
    </html>
  );
}
