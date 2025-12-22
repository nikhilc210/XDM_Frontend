import NewsDetails from "./NewsDetails";

export async function generateMetadata({ params }) {
  // ✅ unwrap params
  const { id } = await params;

  try {
    const res = await fetch(
      `http://api.xdiasporamedia.com/api/news/detail/${id}`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) {
      return {
        title: "Corper News",
        description: "Latest news from Corper News",
      };
    }

    const data = await res.json();
    const news = data?.[0];

    if (!news) {
      return {
        title: "Corper News",
        description: "Latest news from Corper News",
      };
    }

    return {
      title: news.headline,
      description: news.description || news.headline,
      openGraph: {
        title: news.headline,
        description: news.description || news.headline,
        url: `https://corpernews.com/newsDetail/${id}`,
        type: "article",
        images: [
          {
            url: news.newsImageUrl || "https://corpernews.com/placeholder.jpg",
            width: 800,
            height: 600,
            alt: news.headline,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: news.headline,
        description: news.description || news.headline,
        images: [news.newsImageUrl],
      },
    };
  } catch (error) {
    return {
      title: "Corper News",
      description: "Latest news from Corper News",
    };
  }
}

export default async function Page({ params }) {
  // ✅ unwrap params here too
  const { id } = await params;

  return <NewsDetails id={id} />;
}
