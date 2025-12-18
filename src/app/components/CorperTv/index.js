export default function VideoGallery({ news }) {
  const videoData = [
    {
      id: "1",
      title: "Nigeria Army Video",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      id: "2",
      title: "Military Arrest Report",
      videoUrl: "https://www.youtube.com/embed/3JZ_D3ELwOQ",
    },
    {
      id: "3",
      title: "Nollywood Drama Arrest",
      videoUrl: "https://www.youtube.com/embed/FTQbiNvZqaY",
    },
  ];

  return (
    <div className="w-full bg-white py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((video, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative rounded-lg overflow-hidden aspect-video mb-3">
                <iframe
                  width="100%"
                  height="100%"
                  src={"https://www.youtube.com/embed/" + video.youtubeVideoId}
                  title={video.videoTitle}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>

              <div className="flex w-full justify-between">
                <h3 className="text-sm md:text-base font-medium text-gray-900 leading-tight group-hover:text-blue-600 transition-colors duration-200">
                  {video.videoTitle}
                </h3>
                <h3 className="text-sm md:text-base font-medium text-gray-900 leading-tight group-hover:text-blue-600 transition-colors duration-200">
                  Source: {video.source}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
