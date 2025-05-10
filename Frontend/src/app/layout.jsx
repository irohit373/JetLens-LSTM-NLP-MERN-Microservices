import "./globals.css";

export const metadata = {
  title: "JetLens",
  description: "JetLens - Flight Booking with Chatbot",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
