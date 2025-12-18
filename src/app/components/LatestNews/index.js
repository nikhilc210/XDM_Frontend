import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
export default function LatestNews() {
  const [mainNews, setMainNews] = useState([]);

  const getNewsData = () => {
    axios
      .get("https://api.corpernews.com/api/news/")
      .then((response) => {
        const allNews = response.data.filter(
          (item) => item.contentType === "News"
        );

        const sortedNews = allNews
          .sort(
            (a, b) =>
              new Date(b.publishedAt).getTime() -
              new Date(a.publishedAt).getTime()
          )
          .slice(0, 7); // Get the latest 5

        setMainNews(sortedNews);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getNewsData();
  }, []);
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
        Latest News
      </h2>

      <div className="space-y-6">
        {mainNews.map((item, index) => (
          <article key={index}>
            <a
              href={"/newsDetail/" + item._id}
              className="flex gap-4 pb-6 border-b border-gray-100 last:border-b-0"
            >
              <div className="flex-shrink-0">
                <Image
                  src={item.newsImageUrl || "/placeholder.svg"}
                  alt="News thumbnail"
                  width={120}
                  height={80}
                  className="rounded-lg object-cover"
                />
              </div>

              <div className="flex-1 space-y-2">
                <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                  {item.headline}
                </h3>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">{item.time}</span>
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded font-medium">
                    {item.category.toUpperCase()}
                  </span>
                </div>
              </div>
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}
