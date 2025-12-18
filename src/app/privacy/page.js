"use client";
import Image from "next/image";
import axios from "axios";
import React, { useState, useEffect } from "react";
import LatestNews from "../components/LatestNews";

export default function Page() {
  const [about, setAbout] = useState(null);

  const newsItems = Array(6).fill({
    title: "Bet9ja Cashier in Court For Allegedly Stealing Employer's N284,000",
    time: "23 minutes ago",
    category: "Entertainment",
    image: "/placeholder.svg?height=80&width=120",
  });

  const getContent = () => {
    axios
      .get("https://api.corpernews.com/api/informative/")
      .then((response) => {
        console.log(response.data); // Handle successful response
        let res = response.data;

        setAbout(res.data.privacy);
      })
      .catch((error) => {
        console.error(error); // Handle error
      });
  };

  useEffect(() => {
    getContent();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section - About Us */}
        <div className="lg:col-span-2 bg-white rounded-lg p-8 shadow-sm">
          <div className="space-y-8">
            <h1 className="text-2xl font-bold text-gray-900 text-center">
              Privacy
            </h1>

            {/* About Corper News */}
            <div
              className="space-y-4"
              dangerouslySetInnerHTML={{ __html: about }}
            ></div>
          </div>
        </div>

        {/* Right Section - Latest News */}
        <LatestNews />
      </div>
    </div>
  );
}
