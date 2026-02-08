import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  openGraph: {
    title: "DMCI Homes by Bryan Javelosa",
    description: "Official site for DMCI Homes managed by Bryan Javelosa",
    images: [
      {
        url: "/Images/dmciCondo.jpg", // this image will appear on Facebook
        width: 1200,
        height: 630,
        alt: "DMCI Condo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <main>{children}</main>
      </body>
    </html>
  );
}
