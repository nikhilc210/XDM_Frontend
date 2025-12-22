"use client";
import React, { useState, useEffect } from "react";
import HomeHeader from "../components/HomeHeader";
import axios from "axios";
export default function index() {
  const [mainNews, setMainNews] = useState([]);

  const getNewsData = () => {
    axios
      .get("https://api.xdiasporamedia.com/api/news/")
      .then((response) => {
        console.log(response.data); // Handle successful response
        let res = response.data;
        console.log("res========>", res);
        setMainNews(res.filter((item) => item.contentType === "Video"));
      })
      .catch((error) => {
        console.error(error); // Handle error
      });
  };

  useEffect(() => {
    getNewsData();
  }, []);

  return (
    <div className="w-full">
      <HomeHeader title={"Corper TV"} />
      <div className="max-w-7xl mx-auto px-4 mt-[20px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mainNews.map((video) => (
            <div key={video.id} className="group cursor-pointer mb-2">
              <div className="relative rounded-lg overflow-hidden aspect-video mb-3">
                <iframe
                  width="100%"
                  height="100%"
                  src={"https://www.youtube.com/embed/" + video.youtubeVideoId}
                  title={video.videoTitle}
                  source={video.source}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>

              <h3 className="w-full  flex  md:text-center font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors duration-200 flex-row justify-between">
                <span>{video.videoTitle}</span>
                <span>Source: {video.source}</span>
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
