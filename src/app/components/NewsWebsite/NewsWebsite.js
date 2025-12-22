"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Card, Skeleton } from "antd";
import HomeHeader from "../HomeHeader";
import "antd/dist/reset.css";
import axios from "axios";
import { BrowserView, MobileView } from "react-device-detect";
import LatestNews from "../LatestNews";

export default function NewsWebsite({ id, tab }) {
  const safeTab = tab ? decodeURIComponent(tab) : "";

  console.log("NewsWebsite Component - id:", id, "tab:", safeTab);

  /* ================================
     CATEGORY NEWS STATE
  ================================= */
  const [mainNews, setMainNews] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  /* ================================
     ADS STATE
  ================================= */
  const [top, setTop] = useState(null);
  const [middle, setMiddle] = useState(null);
  const [bottom, setBottom] = useState(null);

  /* ================================
     INFINITE SCROLL REF
  ================================= */
  const loadMoreRef = useRef(null);

  /* ================================
     FETCH CATEGORY NEWS (PAGINATED)
  ================================= */
  const getNews = async (pageNumber = 1) => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const res = await axios.get(
        "http://api.xdiasporamedia.com/api/news/category",
        {
          params: {
            category: safeTab,
            contentType: "News",
            page: pageNumber,
            limit: 12,
          },
        }
      );

      const { data, hasMore } = res.data;

      setMainNews((prev) => (pageNumber === 1 ? data : [...prev, ...data]));

      setHasMore(hasMore);
      setPage(pageNumber);
    } catch (error) {
      console.error("Category news error:", error);
    } finally {
      setLoading(false);
    }
  };

  /* ================================
     INITIAL LOAD ON CATEGORY CHANGE
  ================================= */
  useEffect(() => {
    if (!safeTab) return;

    setMainNews([]);
    setPage(1);
    setHasMore(true);
    getNews(1);
  }, [safeTab]);

  /* ================================
     INFINITE SCROLL OBSERVER
  ================================= */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          getNews(page + 1);
        }
      },
      { threshold: 1 }
    );

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [page, hasMore, loading]);

  /* ================================
     FETCH ADS (UNCHANGED)
  ================================= */
  const getAds = () => {
    axios
      .get("http://api.xdiasporamedia.com/api/ads/")
      .then((response) => {
        if (response.data.status === "success") {
          const ads = response.data.data;

          setTop(
            ads.find(
              (item) => item.adLocation === "NEWS_CATEGORY_TOP_RECTANGLE"
            )
          );
          setMiddle(
            ads.find(
              (item) => item.adLocation === "NEWS_CATEGORY_MIDDLE_RECTANGLE"
            )
          );
          setBottom(
            ads.find(
              (item) => item.adLocation === "NEWS_CATEGORY_BOTTOM_LEADERBOARD"
            )
          );
        }
      })
      .catch((error) => console.error("Ads error:", error));
  };

  useEffect(() => {
    getAds();
  }, []);

  /* ================================
     SHIMMER UI
  ================================= */
  const shimmerArray = new Array(8).fill(0);

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <div className="text-center py-4">
        <HomeHeader title={safeTab || "News"} />
      </div>

      <div className="container mx-auto px-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* LEFT CONTENT */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
              {/* SHIMMER */}
              {loading &&
                page === 1 &&
                shimmerArray.map((_, i) => (
                  <Card key={i} style={{ height: 260 }}>
                    <Skeleton.Image
                      active
                      style={{ width: "100%", height: 130 }}
                    />
                    <Skeleton active paragraph={{ rows: 2 }} />
                  </Card>
                ))}

              {/* NEWS CARDS */}
              {mainNews.map((article) => (
                <a href={`/newsDetail/${article._id}`} key={article._id}>
                  <Card
                    className="overflow-hidden"
                    style={{ minHeight: 275 }}
                    cover={
                      <div className="relative w-full aspect-[16/9]">
                        <Image
                          src={article.newsImageUrl}
                          fill
                          unoptimized
                          loading="lazy"
                          className="object-cover"
                          alt={article.headline}
                        />
                      </div>
                    }
                    styles={{ body: { padding: "12px" } }}
                  >
                    <p className="text-sm text-gray-700 line-clamp-2">
                      {article.headline}
                    </p>
                  </Card>
                </a>
              ))}
            </div>

            {/* LOAD MORE TRIGGER */}
            {hasMore && <div ref={loadMoreRef} className="h-12" />}

            {/* BOTTOM AD */}
            <div className="text-center py-8 mb-6">
              <BrowserView>
                {bottom?.redirectUrl && (
                  <div className="relative w-full h-[90px]">
                    <a href={bottom.redirectUrl} target="_blank">
                      <Image
                        src={bottom.desktopImageUrl}
                        fill
                        unoptimized
                        alt=""
                        className="object-cover"
                      />
                    </a>
                  </div>
                )}
              </BrowserView>

              <MobileView>
                {bottom?.redirectUrl && (
                  <a href={bottom.redirectUrl} target="_blank">
                    <Image
                      src={bottom.mobileImageUrl}
                      width={300}
                      height={250}
                      unoptimized
                      alt=""
                    />
                  </a>
                )}
              </MobileView>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="lg:col-span-1 space-y-6">
            {/* TOP AD */}
            <BrowserView>
              {top?.redirectUrl && (
                <a href={top.redirectUrl} target="_blank">
                  <Image
                    src={top.desktopImageUrl}
                    width={450}
                    height={280}
                    unoptimized
                    alt=""
                  />
                </a>
              )}
            </BrowserView>

            <MobileView>
              {top?.redirectUrl && (
                <a href={top.redirectUrl} target="_blank">
                  <Image
                    src={top.mobileImageUrl}
                    width={450}
                    height={280}
                    unoptimized
                    alt=""
                  />
                </a>
              )}
            </MobileView>

            {/* LATEST NEWS (UNCHANGED) */}
            <LatestNews />

            {/* MIDDLE AD */}
            <BrowserView>
              {middle?.redirectUrl && (
                <a href={middle.redirectUrl} target="_blank">
                  <Image
                    src={middle.desktopImageUrl}
                    width={450}
                    height={280}
                    unoptimized
                    alt=""
                  />
                </a>
              )}
            </BrowserView>

            <MobileView>
              {middle?.redirectUrl && (
                <a href={middle.redirectUrl} target="_blank">
                  <Image
                    src={middle.mobileImageUrl}
                    width={450}
                    height={280}
                    unoptimized
                    alt=""
                  />
                </a>
              )}
            </MobileView>
          </div>
        </div>
      </div>
    </div>
  );
}
