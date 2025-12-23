"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";

export default function WorldSection({ mainNews = [], ads = [] }) {
  const stripHtmlTags = (html = "") => {
    if (typeof window === "undefined") return "";
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  const politicsNews = mainNews.filter((item) => item.section === "World News");

  /* =========================
     DESKTOP UI
  ========================= */
  const DesktopColumn = ({ items }) => (
    <div className="space-y-4">
      {/* Top Image */}
      {items[0] && (
        <a href={`/newsDetail/${items[0]._id}`}>
          <div className="relative h-48 w-full">
            <Image
              src={items[0].newsImageUrl}
              alt=""
              fill
              unoptimized
              className="object-cover"
            />
          </div>
          <h2 className="mt-3 font-semibold text-black leading-snug">
            {items[0].headline}
          </h2>
          <p className="text-center text-xs text-red-600 mt-1">
            | {items[0].category.toUpperCase()} |
          </p>
        </a>
      )}

      {/* Text-only List */}
      {items.slice(1).map((item, index) => (
        <a href={`/newsDetail/${item._id}`} key={index}>
          <div className="border-t pt-3">
            <p className="text-sm font-medium text-black leading-snug">
              {item.headline}
            </p>
            <p className="text-center text-xs text-red-600 mt-1">
              | {item.category.toUpperCase()} |
            </p>
          </div>
        </a>
      ))}
    </div>
  );

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* ================= DESKTOP ================= */}
        <BrowserView>
          <div className="grid grid-cols-3 gap-8 relative">
            {/* Vertical Dividers */}
            <div className="absolute left-1/3 top-0 bottom-0 w-px bg-blue-800" />
            <div className="absolute left-2/3 top-0 bottom-0 w-px bg-blue-800" />

            <DesktopColumn items={politicsNews.slice(0, 6)} />
            <DesktopColumn items={politicsNews.slice(6, 12)} />
            <DesktopColumn items={politicsNews.slice(12, 18)} />
          </div>
        </BrowserView>

        {/* ================= MOBILE ================= */}
        <MobileView>
          <div className="space-y-4">
            {politicsNews.map((item, index) => (
              <a href={`/newsDetail/${item._id}`} key={index}>
                <div className="flex gap-3 border-b pb-3">
                  <div className="relative w-20 h-16 flex-shrink-0">
                    <Image
                      src={item.newsImageUrl}
                      alt=""
                      fill
                      unoptimized
                      className="object-cover rounded"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-black leading-snug">
                      {item.headline}
                    </p>
                    <p className="text-xs text-red-600 mt-1">
                      | {item.category.toUpperCase()} |
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </MobileView>
      </div>
    </div>
  );
}
