import Image from "next/image";
import { useEffect, useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";

export default function PoliticsSection({ mainNews, ads }) {
  const [top, setTop] = useState(null);
  const [middle, setMiddle] = useState(null);
  const [bottom, setBottom] = useState(null);
  const stripHtmlTags = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  const filterAds = () => {
    if (ads) {
      let top = ads.filter(
        (item) => item.adLocation === "TRENDING_NEWS_TOP_RECTANGLE"
      );
      let middle = ads.filter(
        (item) => item.adLocation === "TRENDING_NEWS_MIDDLE_RECTANGLE"
      );
      let bottom = ads.filter(
        (item) => item.adLocation === "TRENDING_NEWS_BOTTOM_LEADERBOARD"
      );
      setTop(top[0]);
      setMiddle(middle[0]);
      setBottom(bottom[0]);
    }
  };

  useEffect(() => {
    filterAds();
  }, [ads]);

  if (mainNews) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto p-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column - Featured Articles */}
            <div className="lg:col-span-4 space-y-6">
              {/* First Featured Article */}
              <BrowserView>
                {mainNews
                  .filter((item) => item.section === "Visa & Travel Guides")
                  .slice(0, 2)
                  .map((item, index) => {
                    console.log("item-00000>", item);
                    return (
                      <a href={"/newsDetail/" + item._id} key={index}>
                        <div className="bg-white">
                          <div className="relative h-64 mb-4">
                            <Image
                              src={item.newsImageUrl || "https://"}
                              alt="Legal gavel"
                              unoptimized
                              fill
                              className="object-cover rounded"
                            />
                          </div>
                          <h2 className="text-lg font-bold text-black mb-2 leading-tight">
                            {item.headline}
                          </h2>
                          <p className="text-sm text-black mb-3 truncate overflow-hidden whitespace-nowrap">
                            {stripHtmlTags(item.content)}
                          </p>
                          <div className="text-center">
                            <span className="text-red-500 text-sm font-medium">
                              | {item.category.toUpperCase()} |
                            </span>
                          </div>
                        </div>
                      </a>
                    );
                  })}
              </BrowserView>
              <MobileView>
                {mainNews
                  .filter((item) => item.section === "Visa & Travel Guides")
                  .slice(0, 2)
                  .map((item, index) => (
                    <a href={`/newsDetail/${item._id}`} key={index}>
                      <div className="flex items-start gap-4 border-b pb-4">
                        <div className="relative w-20 h-16 flex-shrink-0 rounded overflow-hidden">
                          <Image
                            src={item.newsImageUrl || "/placeholder.svg"}
                            alt="Politics article"
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h2 className="text-sm font-bold text-black leading-tight mb-2">
                            {item.headline}
                          </h2>
                          <span className="text-red-600 text-xs font-medium">
                            | {item.category.toUpperCase()} |
                          </span>
                        </div>
                      </div>
                    </a>
                  ))}
              </MobileView>
            </div>

            {/* Center Column - News List */}
            <div className="lg:col-span-4 space-y-4">
              {mainNews
                .filter((item) => item.section === "Visa & Travel Guides")
                .slice(3, 10)
                .map((_, index) => (
                  <a href={"/newsDetail/" + _._id} key={index}>
                    <div key={index} className="bg-white  p-3">
                      <div className="flex gap-4">
                        <div className="relative w-20 h-16 flex-shrink-0">
                          <Image
                            src={_.newsImageUrl || "https://"}
                            alt="Legal gavel"
                            fill
                            unoptimized
                            className="object-cover rounded"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-sm font-bold text-black mb-2 leading-tight">
                            {_.headline}
                          </h3>
                          <span className="text-red-500 text-xs font-medium">
                            | {_.category.toUpperCase()} |
                          </span>
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
            </div>

            {/* Right Column - Trending Stories */}
            <div className="lg:col-span-4 space-y-6">
              {/* Trending Stories - Top */}
              <div className="bg-white">
                <div className=" text-white p-0 text-center">
                  <BrowserView>
                    {top?.redirectUrl && (
                      <div
                        style={{
                          position: "relative",
                          width: 450,
                          height: 280,
                        }}
                      >
                        <a href={top?.redirectUrl} target={"_blank"}>
                          <Image
                            alt=""
                            src={top?.desktopImageUrl || "https//"}
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
                        <a href={top?.redirectUrl} target={"_blank"}>
                          <Image
                            alt=""
                            src={top?.mobileImageUrl || "https//"}
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
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-4">
                    {mainNews
                      .filter((item) => item.section === "Visa & Travel Guides")
                      .slice(11, 13)
                      .map((item, index) => {
                        return (
                          <a href={"/newsDetail/" + item._id} key={index}>
                            <div className="text-center">
                              <div className="relative h-32 mb-3">
                                <Image
                                  src={item.newsImageUrl || "https://"}
                                  alt="Legal gavel"
                                  fill
                                  className="object-cover rounded"
                                />
                              </div>
                              <h3 className="text-sm font-bold text-black mb-2 leading-tight">
                                {item.headline}
                              </h3>
                              <span className="text-red-500 text-xs font-medium">
                                | {item.category.toUpperCase()} |
                              </span>
                            </div>
                          </a>
                        );
                      })}
                  </div>
                </div>
              </div>

              {/* Trending Stories - Middle */}
              <div className="bg-white">
                <div className=" text-white p-0  text-center">
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
                      <center>
                        <a href={middle?.redirectUrl} target={"_blank"}>
                          <Image
                            alt=""
                            src={middle?.mobileImageUrl || "https//"}
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
        </div>
      </div>
    );
  }
}
