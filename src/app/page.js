"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserView, MobileView } from "react-device-detect";

/* Components */
import Header from "./components/Header";
import HomeHeader from "./components/HomeHeader";
import FeaturedArticle from "./components/FeaturedArticle";
import NewsGrid from "./components/NewsGrid";
import NewsList from "./components/NewsList";
import SpotifyPlayer from "./components/SpotifyPlayer";
import BottomSection from "./components/BottomSection";
import EditorsPickGrid from "./components/EditorsPickGrid";
import EditorsPickContent from "./components/EditorsPickContent";
import TrendingStories from "./components/TrendingStories";
import PoliticsSection from "./components/PoliticsSection";
import CorperTv from "./components/CorperTv";
import WorldSection from "./components/WorldSection";

/* Axios instance */
const api = axios.create({
  baseURL: "https://api.xdiasporamedia.com/api",
});

export default function Home() {
  /* News states */
  const [featured, setFeatured] = useState([]);
  const [homeNews, setHomeNews] = useState([]);
  const [newsList, setNewsList] = useState([]);
  const [editorsPick, setEditorsPick] = useState([]);
  const [trending, setTrending] = useState([]);
  const [politics, setPolitics] = useState([]);
  const [videos, setVideos] = useState([]);
  const [world, setWorld] = useState([]);

  /* Ads */
  const [ads, setAds] = useState([]);

  /* Fetch all homepage data */
  useEffect(() => {
    Promise.all([
      api.get("/news/featured"),
      api.get("/news/home"),
      api.get("/news/list"),
      api.get("/news/editors-pick"),
      api.get("/news/trending"),
      api.get("/news/politics"),
      api.get("/news/world"),
      api.get("/news/videos"),
      api.get("/ads"),
    ])
      .then(
        ([
          featuredRes,
          homeRes,
          listRes,
          editorsRes,
          trendingRes,
          politicsRes,
          worldRes,
          videosRes,
          adsRes,
        ]) => {
          setFeatured(featuredRes.data || []);
          setHomeNews(homeRes.data || []);
          setNewsList(listRes.data || []);
          setEditorsPick(editorsRes.data || []);
          setTrending(trendingRes.data || []);
          setPolitics(politicsRes.data || []);
          setWorld(worldRes.data || []);
          setVideos(videosRes.data || []);
          setAds(adsRes.data?.data || []);
        }
      )
      .catch((err) => {
        console.error("Homepage API error:", err);
      });
  }, []);

  /* Reusable Ads Renderer */
  const renderAd = (location) => {
    const ad = ads.find((a) => a.adLocation === location);
    if (!ad) return null;

    return (
      <>
        <BrowserView>
          {ad.redirectUrl && (
            <center>
              <a
                href={ad.redirectUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={ad.desktopImageUrl || "/placeholder.svg"}
                  alt="Advertisement"
                  width={728}
                  height={90}
                  unoptimized
                  style={{ objectFit: "contain" }}
                />
              </a>
            </center>
          )}
        </BrowserView>

        <MobileView>
          {ad.redirectUrl && (
            <center>
              <a href={ad.redirectUrl} target="_blank">
                <img
                  src={ad.mobileImageUrl}
                  width={300}
                  height={250}
                  alt="Advertisement"
                />
              </a>
            </center>
          )}
        </MobileView>
      </>
    );
  };

  return (
    <>
      {/* HEADER AD */}
      <div className="max-w-7xl mx-auto py-3">
        {renderAd("HEADER_LEADERBOARD")}
      </div>

      {/* DESKTOP VIEW */}
      <div className="max-w-7xl mx-auto hidden lg:flex gap-6">
        <div className="flex-1">
          <FeaturedArticle mainNews={featured} />
          <NewsGrid items={homeNews.slice(0, 4)} showAds={false} />
        </div>

        <div className="w-100">
          <NewsList items={newsList} ads={ads} />
        </div>

        <div className="w-100">
          <SpotifyPlayer />
          <NewsGrid items={homeNews.slice(4, 6)} showAds ads={ads} />
        </div>
      </div>

      {/* MOBILE VIEW */}
      <div className="lg:hidden px-4">
        <FeaturedArticle mainNews={featured} />
        <NewsGrid items={homeNews.slice(0, 4)} showAds={false} />
        <NewsList items={newsList} ads={ads} />
      </div>

      <center>
        <BottomSection ads={ads} />
      </center>

      {/* EDITORS PICK */}
      <HomeHeader title="EDITOR'S PICK" />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <EditorsPickGrid items={editorsPick} />
        <EditorsPickContent
          sidebarItems={editorsPick}
          mainArticles={editorsPick}
          ads={ads}
        />
        {renderAd("EDITORS_PICK_BOTTOM_LEADERBOARD")}
      </div>

      {/* TRENDING */}
      <HomeHeader title="TRENDING STORIES" />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <TrendingStories mainNews={trending} ads={ads} />
        {renderAd("TRENDING_NEWS_BOTTOM_LEADERBOARD")}
      </div>

      {/* POLITICS */}
      <HomeHeader title="POLITICS" />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <PoliticsSection mainNews={politics} ads={ads} />
        {renderAd("POLITICS_BOTTOM_LEADERBOARD")}
      </div>

      <HomeHeader title="WORLD NEWS" />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <WorldSection mainNews={world} ads={ads} />
        {renderAd("POLITICS_BOTTOM_LEADERBOARD")}
      </div>

      {/* CORPER TV */}
      <HomeHeader title="XD TV" />
      <CorperTv news={videos} />

      <div className="lg:hidden">
        <SpotifyPlayer isMobile />
      </div>
    </>
  );
}
