"use client";
import Image from "next/image";
import LatestNews from "../components/LatestNews";

export default function Page() {
  const newsItems = Array(7).fill({
    title: "Bet9ja Cashier in Court For Allegedly Stealing Employer's N284,000",
    time: "23 minutes ago",
    category: "Entertainment",
    image: "/placeholder.svg?height=80&width=120",
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section - Story Submission */}
        <div className="lg:col-span-2 bg-white rounded-lg p-8 shadow-sm">
          <div className="text-center space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Send XDiaspora Media a hint
            </h1>

            <h2 className="text-xl font-semibold text-gray-800">
              Have a Story to Share?
            </h2>

            <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
              We'd love to hear it! Whether it's breaking news, a personal
              experience, or an inspiring event, your story matters. Send it to
              us via WhatsApp and let your voice be heard!
            </p>

            <div className="mt-8">
              <div className="border-2 border-gray-200 rounded-lg p-6 bg-gray-50 inline-block">
                <p className="text-lg">
                  <span className="font-semibold text-gray-900">Whatsapp:</span>{" "}
                  <span className="text-gray-700">+81807422031</span>
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
