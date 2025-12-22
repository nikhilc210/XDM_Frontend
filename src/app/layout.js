import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Head from "next/head";
import InstallPWA from "./InstallPWA";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "XDiaspora Media",
  description: "XDiaspora Media progressive web app",
  display: "standalone",
  background_color: "#ffffff",
  theme_color: "#0D4A9D",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/icons/icon-192x192.png",
    apple: "/icons/icon-512x512.png",
  },
  // other: {
  //   "google-adsense-account": "ca-pub-5104378134649664",
  // },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />

        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0D4A9D" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <InstallPWA /> */}
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
