import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header"; // Import Header
import Footer from "@/components/Footer"; // Import Footer
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dutch Fashion Return Reduction Toolkit", // Updated Title
  description: "Tools and insights to help Dutch fashion SMEs reduce returns.", // Updated Description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`} // Added flex classes
      >
        <Header /> {/* Added Header */}
        <main className="flex-grow container mx-auto px-4 py-8"> {/* Added main wrapper */}
          {children}
        </main>
        <Footer /> {/* Added Footer */}
      </body>
    </html>
  );
}
