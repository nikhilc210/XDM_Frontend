import Image from "next/image";
import { useEffect, useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";
export default function NewsList({ items, ads }) {
  const [top, setTop] = useState(null);
  const [middle, setMiddle] = useState(null);
  const [bottom, setBottom] = useState(null);

  function timeAgo(dateString) {
    const now = new Date();
    const past = new Date(dateString);
    const seconds = Math.floor((now - past) / 1000);

    const intervals = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
      { label: "second", seconds: 1 },
    ];

    for (const interval of intervals) {
      const count = Math.floor(seconds / interval.seconds);
      if (count >= 1) {
        return `${count} ${interval.label}${count !== 1 ? "s" : ""} ago`;
      }
    }

    return "just now";
  }

  return (
    <>
      <BrowserView>
        <div className="space-y-4">
          {items.slice(0, 7).map((item, index) => (
            <a
              key={index}
              href={"/newsDetail/" + item._id}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 py-0 border-b border-gray-300"
            >
              <img
                src={item.newsImageUrl || "/placeholder.svg"}
                alt="News thumbnail"
                className="w-30 h-20 object-cover flex-shrink-0 -mt-6"
              />
              <div className="flex-1 text-center">
                <h4 className="text-base font-extrabold text-black leading-snug">
                  {item.headline}
                </h4>
                <p className="text-sm text-gray-600 mt-1 mb-1">
                  {timeAgo(item.publishedAt)}
                </p>
                <span className="text-red-600 text-sm font-bold">
                  | {item?.category?.toUpperCase()} |
                </span>
              </div>
            </a>
          ))}
        </div>
      </BrowserView>
      <MobileView>
        <div className="space-y-4 px-0">
          {items.slice(0, 7).map((item, index) => (
            <a
              key={index}
              href={"/newsDetail/" + item._id}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-3 pb-3 border-b border-gray-200"
            >
              <img
                src={item.newsImageUrl || "/placeholder.svg"}
                alt="News thumbnail"
                className="w-20 h-16 object-cover flex-shrink-0 rounded-md"
              />
              <div className="flex flex-col justify-between flex-1">
                <h4 className="text-sm font-bold text-black leading-tight">
                  {item.headline}
                </h4>
                <span className="text-red-600 text-xs  mt-1">
                  | {item?.category?.toUpperCase()} |
                </span>
              </div>
            </a>
          ))}
        </div>
      </MobileView>
    </>
  );
}
