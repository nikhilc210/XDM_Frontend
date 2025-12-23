"use client";
import Image from "next/image";
import LatestNews from "../components/LatestNews";

export default function page() {
  const newsItems = Array(6).fill({
    title: "Bet9ja Cashier in Court For Allegedly Stealing Employer's N284,000",
    time: "23 minutes ago",
    category: "Entertainment",
    image: "/placeholder.svg?height=80&width=120",
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section - Advert Inquiry */}
        <div className="lg:col-span-2 bg-white rounded-lg p-8 shadow-sm">
          <div className="text-center space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Advert Inquiry</h1>

            <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Want to advertise with us? We offer premium ad placements to help
              you reach your target audience effectively. Call, Chat or email us
              for more details.
            </p>

            <div className="mt-8">
              <div className="border-2 border-gray-200 rounded-lg p-6 bg-gray-50 inline-block">
                <p className="text-lg">
                  <span className="font-semibold text-gray-900">Whatsapp:</span>{" "}
                  <a
                    href="https://wa.me/81807422031"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-800 hover:underline"
                  >
                    +81807422031
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Latest News */}
        <LatestNews />
      </div>
    </div>
  );
}
