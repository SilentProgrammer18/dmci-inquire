import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
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
  title: "DMCI Homes by Bryan Javelosa",
  description: "Official site for DMCI Homes managed by Bryan Javelosa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Header with DMCI image */}
        <header style={{ width: "100%", textAlign: "center", marginBottom: "2rem" }}>
          <Image
            src="/Images/dmciCondo.jpg"
            alt="DMCI Condo"
            width={1200}  // adjust width as needed
            height={400}  // adjust height as needed
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </header>

        {/* Main content */}
        <main>{children}</main>
      </body>
    </html>
  );
}
