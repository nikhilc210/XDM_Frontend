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
              <div className="border-2 border-gray-200 rounded-lg p-6 bg-gray-50 max-w-md mx-auto">
                <div className="space-y-4 text-left">
                  <p className="text-lg">
                    <span className="font-semibold text-gray-900">Email:</span>{" "}
                    <a
                      href="mailto:advertise@corpernews.com"
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      advertise@corpernews.com
                    </a>
                  </p>

                  <p className="text-lg">
                    <span className="font-semibold text-gray-900">Call:</span>{" "}
                    <span className="space-x-2">
                      <a
                        href="tel:08012345678"
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        08012345678
                      </a>
                      <span className="text-gray-700">,</span>
                      <a
                        href="tel:09012345678"
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        09012345678
                      </a>
                    </span>
                  </p>

                  <p className="text-lg">
                    <span className="font-semibold text-gray-900">
                      Whatsapp:
                    </span>{" "}
                    <a
                      href="https://wa.me/23490987654321"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-800 hover:underline"
                    >
                      +23490987654321
                    </a>
                  </p>
                </div>
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
