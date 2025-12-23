import Image from "next/image";
import { useEffect, useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";

export default function EditorsPickContent({
  sidebarItems,
  mainArticles,
  ads,
}) {
  const [top, setTop] = useState(null);
  const [middle, setMiddle] = useState(null);
  const [bottom, setBottom] = useState(null);

  useEffect(() => {
    const topAd = ads.find(
      (item) => item.adLocation === "EDITORS_PICK_TOP_RECTANGLE"
    );
    const middleAd = ads.find(
      (item) => item.adLocation === "EDITORS_PICK_MIDDLE_RECTANGLE"
    );
    const bottomAd = ads.find(
      (item) => item.adLocation === "EDITORS_PICK_BOTTOM_LEADERBOARD"
    );
    setTop(topAd);
    setMiddle(middleAd);
    setBottom(bottomAd);
  }, [ads]);

  const editorsPickArticles = mainArticles.filter(
    (item) => item.section === "Diaspora Voices"
  );
  const sidebarFiltered = sidebarItems.filter(
    (item) => item.section === "Diaspora Voices"
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Sidebar */}
      <div className="lg:col-span-3">
        <div className="space-y-4">
          {sidebarFiltered.slice(0, 5).map((item, index) => (
            <a
              href={`/newsDetail/${item._id}`}
              key={index}
              className="flex gap-3 pb-3 border-b border-gray-200"
            >
              <img
                src={item.newsImageUrl || "/placeholder.svg"}
                alt="News thumbnail"
                className="w-16 h-12 object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <h4 className="text-sm font-bold text-black leading-tight mb-1 line-clamp-2">
                  {item.headline}
                </h4>
                <span className="text-red-600 text-xs font-medium">
                  | {item.category.toUpperCase()} |
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:col-span-5">
        <div className="space-y-4">
          {editorsPickArticles.slice(6, 7).map((article) => (
            <a href={`/newsDetail/${article._id}`} key={article._id}>
              {article.note && (
                <p className="text-center text-white bg-black bg-opacity-70 py-2 px-4 mb-4 rounded">
                  {article.note}
                </p>
              )}
              <div className="flex flex-row md:flex-col items-start md:items-center gap-4 border-b border-[#f1f1f1] pb-4">
                <img
                  src={article.newsImageUrl || "/placeholder.svg"}
                  alt="Main article"
                  className="w-24 h-24 md:w-full md:h-auto object-cover"
                />
                <div className="flex-1 mt-1 text-left md:text-center">
                  <h2 className="text-sm md:text-lg font-bold text-black mb-1 leading-snug">
                    {article.headline}
                  </h2>
                  <span className="text-red-600 font-medium text-xs md:text-base">
                    | {article.category.toUpperCase()} |
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Mobile Main Content */}
      <MobileView>
        <div className="divide-y divide-gray-200 px-4">
          {editorsPickArticles.slice(8, 9).map((article) => (
            <a
              href={`/newsDetail/${article._id}`}
              key={article._id}
              className="flex items-start py-4"
            >
              <img
                src={article.newsImageUrl || "/placeholder.svg"}
                alt="thumbnail"
                className="w-16 h-16 object-cover rounded mr-3"
              />
              <div className="flex-1">
                <h2 className="text-sm font-bold text-black leading-snug mb-2">
                  {article.headline}
                </h2>
                <span className="text-red-600 text-xs font-medium">
                  | {article.category.toUpperCase()} |
                </span>
              </div>
            </a>
          ))}
        </div>
      </MobileView>

      {/* Right Sidebar */}
      <div className="lg:col-span-4">
        <div className="space-y-6">
          {/* Top Ad */}
          <div className="text-white text-center">
            <BrowserView>
              {top?.redirectUrl && (
                <div style={{ position: "relative", width: 450, height: 280 }}>
                  <a href={top.redirectUrl} target="_blank">
                    <Image
                      alt="Top Ad"
                      src={top.desktopImageUrl || "/placeholder.svg"}
                      unoptimized
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </a>
                </div>
              )}
            </BrowserView>
            <MobileView>
              {top?.redirectUrl && (
                <center>
                  <a href={top.redirectUrl} target="_blank">
                    <Image
                      alt="Top Ad Mobile"
                      src={top.mobileImageUrl || "/placeholder.svg"}
                      unoptimized
                      width={300}
                      height={250}
                      style={{ objectFit: "cover" }}
                    />
                  </a>
                </center>
              )}
            </MobileView>
          </div>

          {/* Small News Card */}
          <BrowserView>
            <div className="flex w-full max-w-md bg-white p-0">
              {editorsPickArticles.slice(9, 10).map((article) => (
                <a
                  href={`/newsDetail/${article._id}`}
                  key={article._id}
                  className=" flex items-center gap-3"
                >
                  <img
                    src={article.newsImageUrl}
                    alt="News thumbnail"
                    className="w-[100px] h-[80px] object-cover flex-shrink-0"
                  />
                  <div className="ml-2">
                    <h4 className="text-sm font-bold text-black leading-snug line-clamp-3">
                      {article.headline}
                    </h4>
                    <span className="text-red-600 text-xs font-medium text-center">
                      | {article.category.toUpperCase()} |
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </BrowserView>

          {/* Mobile Small Card */}
          <MobileView>
            <div className="space-y-4 mb-6 px-4">
              {editorsPickArticles.slice(11, 16).map((article) => (
                <a
                  href={`/newsDetail/${article._id}`}
                  key={article._id}
                  className="flex items-start border-b pb-4"
                >
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-black leading-snug mb-1 line-clamp-2">
                      {article.headline}
                    </h4>
                    <span className="text-red-600 text-xs font-medium">
                      | {article.category.toUpperCase()} |
                    </span>
                  </div>
                  <img
                    src={article.newsImageUrl || "/placeholder.svg"}
                    alt="thumbnail"
                    className="ml-3 w-16 h-12 object-cover rounded"
                  />
                </a>
              ))}
            </div>
          </MobileView>

          {/* Middle Ad */}
          <div className="text-white text-center">
            <BrowserView>
              {middle?.redirectUrl && (
                <div style={{ position: "relative", width: 450, height: 280 }}>
                  <a href={middle.redirectUrl} target="_blank">
                    <Image
                      alt="Middle Ad"
                      src={middle.desktopImageUrl || "/placeholder.svg"}
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
                <center>
                  <a href={middle.redirectUrl} target="_blank">
                    <Image
                      alt="Middle Ad Mobile"
                      src={middle.mobileImageUrl || "/placeholder.svg"}
                      unoptimized
                      width={300}
                      height={250}
                      style={{ objectFit: "cover" }}
                    />
                  </a>
                </center>
              )}
            </MobileView>
          </div>
        </div>
      </div>
    </div>
  );
}
