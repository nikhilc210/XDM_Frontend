"use client";
import Image from "next/image";
import NewsCard from "../NewsCard";
import { useEffect, useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";
export default function NewsGrid({ items, variant = "grid", showAds, ads }) {
  const [top, setTop] = useState(null);
  const [middle, setMiddle] = useState(null);
  const [bottom, setBottom] = useState(null);

  const filterAds = () => {
    if (showAds) {
      let top = ads.filter((item) => item.adLocation === "HEADER_LEADERBOARD");
      let middle = ads.filter(
        (item) => item.adLocation === "TOP_STORIES_MIDDLE_RECTANGLE"
      );
      let bottom = ads.filter(
        (item) => item.adLocation === "TOP_STORIES_BOTTOM_LEADERBOARD"
      );
      setTop(top[0]);
      setMiddle(middle[0]);
      setBottom(bottom[0]);
    }
  };

  function formatTimeAgo(dateString) {
    const diffMs = Date.now() - new Date(dateString).getTime();
    const diffMinutes = Math.floor(diffMs / 60000);
    if (diffMinutes < 60)
      return `${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""} ago`;
    const diffHours = Math.floor(diffMinutes / 60);
    return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
  }

  useEffect(() => {
    filterAds();
  }, [ads, filterAds]);
  const gridClass =
    variant === "vertical"
      ? "grid grid-cols-1 gap-4"
      : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4";

  return (
    <>
      <BrowserView>
        <div className={`${gridClass} mb-6`}>
          {items.map((item) => (
            <NewsCard key={item._id} item={item} />
          ))}
          {showAds && (
            <div className=" text-white p-0 rounded-lg text-center">
              <BrowserView>
                {middle?.redirectUrl && (
                  <div
                    style={{
                      position: "relative",
                      width: 450,
                      height: 280,
                    }}
                  >
                    <a
                      href={middle?.redirectUrl || "https//"}
                      target={"_blank"}
                    >
                      <Image
                        src={middle?.desktopImageUrl || "https//"}
                        alt=""
                        unoptimized
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </a>
                  </div>
                )}
              </BrowserView>
              <MobileView>
                {middle?.redirectUrl && (
                  <a href={middle?.redirectUrl} target={"_blank"}>
                    <Image
                      alt=""
                      src={middle?.mobileImageUrl || "https//"}
                      unoptimized
                      width={300}
                      height={250}
                    />
                  </a>
                )}
              </MobileView>
            </div>
          )}
        </div>
      </BrowserView>
      <MobileView>
        <div className="space-y-4 mb-6 mt-2">
          {items.map((item) => (
            <a
              key={item.id}
              href={`/newsDetail/${item._id}`}
              className="flex items-start border-b pb-4"
            >
              <div className="flex-1">
                <h2 className="text-sm font-semibold text-black leading-snug">
                  {item.headline}
                </h2>
                <p className="text-xs mt-1">
                  <span className="text-red-600 font-medium">
                    | {item.category} |
                  </span>{" "}
                </p>
              </div>
              <Image
                src={item.newsImageUrl || "/placeholder.svg"}
                alt="news thumbnail"
                width={64}
                height={64}
                className="ml-3 rounded object-cover"
                unoptimized
              />
            </a>
          ))}

          {showAds && middle && (
            <div className="flex justify-center py-4">
              {middle?.redirectUrl && (
                <a href={middle?.redirectUrl || "#"} target="_blank">
                  <Image
                    src={middle?.mobileImageUrl || "/placeholder-ad.svg"}
                    alt="ad"
                    width={300}
                    height={250}
                    unoptimized
                  />
                </a>
              )}
            </div>
          )}
        </div>
      </MobileView>
    </>
  );
}
