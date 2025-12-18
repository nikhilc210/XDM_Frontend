"use client";
import { useEffect, useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";

export default function FeaturedArticle({ mainNews }) {
  const [latestArticle, setLatestArticle] = useState(null);

  useEffect(() => {
    if (mainNews && mainNews.length) {
      const latest = mainNews.reduce((latestObj, currentObj) => {
        return new Date(currentObj.publishedAt) >
          new Date(latestObj.publishedAt)
          ? currentObj
          : latestObj;
      });
      setLatestArticle(latest);
    }
  }, [mainNews]);

  if (!latestArticle) return null;

  function formatTimeAgo(dateString) {
    const diffMs = Date.now() - new Date(dateString).getTime();
    const diffMinutes = Math.floor(diffMs / 60000);
    if (diffMinutes < 60)
      return `${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""} ago`;
    const diffHours = Math.floor(diffMinutes / 60);
    return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
  }

  return (
    <>
      <BrowserView>
        <div className="mb-6">
          <a href={"/newsDetail/" + latestArticle._id}>
            <img
              src={latestArticle.newsImageUrl || "/placeholder.svg"}
              alt="Featured article"
              className="w-full h-48 md:h-64 lg:h-80 object-cover mb-4"
            />
            <h2 className="text-lg md:text-xl lg:text-xl font-bold text-black mb-1">
              {latestArticle.headline}
            </h2>
            <h3 className="text-base md:text-lg font-bold text-black mb-2">
              {latestArticle.source}
            </h3>
            <span className="text-red-600 font-medium">
              | {latestArticle.category.toUpperCase()} |
            </span>
          </a>
        </div>
      </BrowserView>
      <MobileView>
        <a
          href={`/newsDetail/${latestArticle._id}`}
          className="flex items-start border-b pb-4"
        >
          <div className="flex-1">
            <h2 className="text-sm font-semibold text-black leading-snug">
              p {latestArticle.headline}
            </h2>
            <p className="text-xs mt-1">
              <span className="text-red-600 font-medium">
                | {latestArticle.category.toUpperCase()}
              </span>{" "}
            </p>
          </div>
          <img
            src={latestArticle.newsImageUrl || "/placeholder.svg"}
            alt="news thumbnail"
            className="ml-3 w-16 h-16 object-cover rounded"
          />
        </a>
      </MobileView>
    </>
  );
}
