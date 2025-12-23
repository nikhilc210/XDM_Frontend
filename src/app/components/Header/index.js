"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { IMAGES, logo } from "../../assets/image";
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    {
      id: 1,
      title: "Community Stories",
    },
    {
      id: 2,
      title: "Politics & Policy",
    },
    {
      id: 3,
      title: "Culture",
    },
    {
      id: 4,
      title: "Events",
    },
    {
      id: 5,
      title: "Interviews",
    },
    {
      id: 6,
      title: "Opinion",
    },
    {
      id: 7,
      title: "Travel & Migration",
    },
    {
      id: 7,
      title: "Visa Updates",
    },
    // {
    //   id: 8,
    //   title: "ICT",
    // },
  ];

  return (
    <header className="w-full">
      {/* Desktop Top Bar */}
      <div className="hidden md:flex justify-between items-center bg-white px-6 py-3 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <a href={"/"}>
            <Image
              src={IMAGES.logo}
              alt="CorperNews24"
              width={180}
              height={50}
              className="h-auto"
            />
          </a>
        </div>
        <div className="flex items-center gap-8">
          <a
            href="/story"
            className="text-gray-700 hover:text-blue-600 text-sm font-medium"
          >
            Send your Story ?
          </a>
          <a
            href="/inquiry"
            className="text-gray-700 hover:text-blue-600 text-sm font-medium"
          >
            Advert Inquiry
          </a>
        </div>
      </div>

      {/* Mobile Top Bar */}
      <div className="md:hidden flex justify-between items-center bg-white px-4 py-3 border-b border-gray-200">
        <a href={"/"}>
          <Image
            src={IMAGES.logo}
            alt="XDM"
            width={180}
            height={50}
            className="h-auto"
          />
        </a>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 hover:bg-gray-100 rounded-md transition-colors"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-gray-700" />
          ) : (
            <Menu className="w-6 h-6 text-gray-700" />
          )}
        </button>
      </div>

      {/* Header Banner */}
      {/* <div className="bg-blue-900 text-white text-center py-12 md:py-0">
        <h1 className="text-3xl md:text-4xl font-bold">
          <span className="md:hidden">Header Custom Ad</span>
        </h1>
      </div> */}

      {/* Desktop Navigation */}
      <nav className="hidden md:block bg-[#2e8b57]">
        <ul className="flex justify-center">
          <li>
            <a
              href={"/"}
              className="block px-6 py-3 text-white hover:bg-[#2e8b57] transition-colors text-sm font-medium border-r border-[#2e8b57] last:border-r-0"
            >
              Home
            </a>
          </li>
          {navigationItems.map((item, index) => (
            <li key={index}>
              <a
                href={"/category/" + item.id + "/" + item.title}
                className="block px-6 py-3 text-white hover:bg-[#2e8b57] transition-colors text-sm font-medium border-r border-[#2e8b57] last:border-r-0"
              >
                {item.title}
              </a>
            </li>
          ))}
          <li>
            <a
              href={"/videos"}
              className="block px-6 py-3 text-white hover:bg-[#2e8b57] transition-colors text-sm font-medium border-r border-[#2e8b57] last:border-r-0"
            >
              XD TV
            </a>
          </li>
          <li>
            <a
              href={"/podcast"}
              className="block px-6 py-3 text-white hover:bg-[#2e8b57] transition-colors text-sm font-medium border-r border-[#2e8b57] last:border-r-0"
            >
              Podcast
            </a>
          </li>
        </ul>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-[#2e8b57]">
          <ul>
            <li>
              <a
                href={"/"}
                className="block px-4 py-3 text-white hover:bg-[#2e8b57] transition-colors border-b border-[#2e8b57] last:border-b-0"
              >
                Home
              </a>
            </li>
            {navigationItems.map((item, index) => (
              <li key={index}>
                <a
                  href={"/category/" + item.id + "/" + item.title}
                  className="block px-4 py-3 text-white hover:bg-[#2e8b57] transition-colors border-b border-[#2e8b57] last:border-b-0"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.title}
                </a>
              </li>
            ))}
            <li>
              <a
                href={"/videos"}
                className="block px-4 py-3 text-white hover:bg-[#2e8b57] transition-colors border-b border-[#2e8b57] last:border-b-0"
              >
                XD TV
              </a>
            </li>
            <li>
              <a
                href={"/podcast"}
                className="block px-4 py-3 text-white hover:bg-[#2e8b57] transition-colors border-b border-[#2e8b57] last:border-b-0"
              >
                Podcast
              </a>
            </li>
            <li className="border-t-1 border-white mt-2 pt-2">
              <a
                href="/story"
                className="block px-4 py-3 text-white hover:bg-[#2e8b57] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Send your Story ?
              </a>
            </li>
            <li>
              <a
                href="/inquiry"
                className="block px-4 py-3 text-white hover:bg-[#2e8b57] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Advert Inquiry
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
