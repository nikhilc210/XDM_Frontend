"use client";
import Image from "next/image";
import { Card, Tag, Space, Divider } from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  MessageOutlined,
  TagOutlined,
  UserOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import LatestNews from "@/app/components/LatestNews";
import { FaXTwitter } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import axios from "axios";
import { BrowserView, MobileView } from "react-device-detect";
import Reactions from "./Reaction";

export default function NewsDetails({ id }) {
  const [ads, setAds] = useState([{}]);
  const [news, setNews] = useState(null);

  const [top, setTop] = useState(null);
  const [middle, setMiddle] = useState(null);
  const [bottom, setBottom] = useState(null);

  const filterAds = () => {
    let top = ads.filter(
      (item) => item.adLocation === "NEWS_DETAIL_TOP_LEADERBOARD"
    );
    let middle = ads.filter(
      (item) => item.adLocation === "NEWS_DETAIL_MIDDLE_RECTANGLE"
    );
    let bottom = ads.filter(
      (item) => item.adLocation === "NEWS_DETAIL_BOTTOM_RECTANGLE"
    );
    setTop(top[0]);
    setMiddle(middle[0]);
    setBottom(bottom[0]);
  };

  useEffect(() => {
    axios
      .get(`https://api.xdiasporamedia.com/api/news/detail/${id}`)
      .then((response) => {
        setNews(response.data[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const getAds = () => {
    axios
      .get("https://api.xdiasporamedia.com/api/ads/")
      .then((response) => {
        console.log(response.data); // Handle successful response
        let res = response.data;
        console.log("res====>", res);
        if (res.status === "success") {
          setAds(res.data);
        }
      })
      .catch((error) => {
        console.error(error); // Handle error
      });
  };

  useEffect(() => {
    getAds();
  }, []);

  useEffect(() => {
    filterAds();
  }, [ads]);

  if (!news) {
    return <div className="p-8">Loading...</div>;
  }

  const shareUrl = `https://corpernews.com/newsDetail/${news._id}`;
  const encodedHeadline = encodeURIComponent(news.headline);

  const ShareButtons = () => (
    <div className="flex items-center justify-between mb-6">
      <span className="text-sm font-medium">Share News</span>
      <div className="flex gap-2">
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            shareUrl
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className=" w-[50px] h-[50px] flex justify-center items-center shadow rounded-full  hover:bg-blue-100 text-[24px] !bg-[#3b5998] !text-[#FFFFFF]"
        >
          <FacebookOutlined width={25} size={25} />
        </a>
        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
            shareUrl
          )}&text=${encodedHeadline}`}
          target="_blank"
          rel="noopener noreferrer"
          className=" w-[50px] h-[50px] flex justify-center items-center shadow rounded-full !bg-[#000000] text-[24px] hover:bg-blue-100 !text-[#FFFFFF]"
        >
          <FaXTwitter />
        </a>

        <a
          href={`https://wa.me/?text=${encodeURIComponent(
            news.headline + " " + shareUrl
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className=" w-[50px] h-[50px] flex justify-center items-center shadow rounded-full !bg-[#075e54] text-[24px] hover:bg-blue-100 !text-[#FFFFFF]"
        >
          <FaWhatsapp />
        </a>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className=" text-white py-4 px-6 -mt-6">
          <>
            <BrowserView>
              {bottom?.redirectUrl && (
                <center>
                  <a
                    href={bottom?.redirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={bottom?.desktopImageUrl || "/placeholder.svg"}
                      alt="Advertisement"
                      width={728} // or the image's actual width
                      height={90} // or the image's actual height
                      unoptimized
                      style={{ objectFit: "contain" }}
                    />
                  </a>
                </center>
              )}
            </BrowserView>
            <MobileView>
              {bottom?.redirectUrl && (
                <a href={bottom?.redirectUrl} target={"_blank"}>
                  <center>
                    <Image
                      src={bottom?.mobileImageUrl || "https//"}
                      alt=""
                      unoptimized
                      width={400}
                      height={90}
                    />
                  </center>
                </a>
              )}
            </MobileView>
          </>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 -mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="shadow-sm">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                {news.headline}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                <Space>
                  <TagOutlined />
                  <span>Category: {news.category}</span>
                </Space>
                <Space>
                  <UserOutlined />
                  <span>Section: {news.section}</span>
                </Space>
                <Space>
                  <CalendarOutlined />
                  <span>
                    {new Date(news.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </Space>
              </div>

              {/* Share Buttons Top */}
              <ShareButtons />

              {/* Article Content */}
              <div className="space-y-6 mb-6">
                <Image
                  src={
                    news.newsImageUrl || "/placeholder.svg?height=400&width=600"
                  }
                  alt={news.headline}
                  width={600}
                  height={400}
                  className="w-full rounded-lg"
                />

                <div
                  className="text-gray-700 leading-relaxed space-y-4 text-[17px]"
                  dangerouslySetInnerHTML={{ __html: news.content }}
                />
              </div>

              <Divider />

              <div className="mb-6">
                <p className="text-sm text-gray-600">
                  <strong>Source:</strong> {news.source}
                </p>
              </div>

              {/* Share Buttons Bottom */}
              <ShareButtons />

              <Divider />

              {/* Reaction Section */}
              <Reactions id={id} />
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {middle?.redirectUrl && (
              <BrowserView>
                <div
                  style={{
                    position: "relative",
                    width: 450,
                    height: 280,
                  }}
                >
                  <a href={middle?.redirectUrl} target={"_blank"}>
                    <Image
                      alt=""
                      src={middle?.desktopImageUrl || "https//"}
                      unoptimized
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </a>
                </div>
              </BrowserView>
            )}
            {middle?.redirectUrl && (
              <MobileView>
                <a href={middle?.redirectUrl} target={"_blank"}>
                  <Image
                    alt=""
                    src={middle?.mobileImageUrl || "https//"}
                    unoptimized
                    width={450}
                    height={280}
                  />
                </a>
              </MobileView>
            )}

            {bottom?.redirectUrl && (
              <BrowserView>
                <div
                  style={{
                    position: "relative",
                    width: 450,
                    height: 280,
                  }}
                >
                  <a href={bottom?.redirectUrl} target={"_blank"}>
                    <Image
                      alt=""
                      src={bottom?.desktopImageUrl || "https//"}
                      unoptimized
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </a>
                </div>
              </BrowserView>
            )}

            {middle?.redirectUrl && (
              <MobileView>
                <a href={bottom?.redirectUrl} target={"_blank"}>
                  <Image
                    alt=""
                    src={bottom?.mobileImageUrl || "https//"}
                    unoptimized
                    width={450}
                    height={280}
                  />
                </a>
              </MobileView>
            )}

            <LatestNews />

            {/* <Card>
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg p-8 text-center border-2 border-dashed border-gray-200">
                <div className="space-y-2">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full mx-auto flex items-center justify-center">
                    <span className="text-white font-bold text-lg">S</span>
                  </div>
                  <p className="text-gray-600 font-medium">Advertisement</p>
                  <p className="text-xs text-gray-400 tracking-wider">
                    SEPHORA
                  </p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg p-8 text-center border-2 border-dashed border-gray-200">
                <div className="space-y-2">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full mx-auto flex items-center justify-center">
                    <span className="text-white font-bold text-lg">S</span>
                  </div>
                  <p className="text-gray-600 font-medium">Advertisement</p>
                  <p className="text-xs text-gray-400 tracking-wider">
                    SEPHORA
                  </p>
                </div>
              </div>
            </Card> */}
          </div>
        </div>
      </div>
    </div>
  );
}
