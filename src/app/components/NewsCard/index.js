export default function NewsCard({ item }) {
  return (
    <div>
      <a href={"/newsDetail/" + item._id}>
        <img
          src={item.newsImageUrl || "/placeholder.svg"}
          alt="News"
          className="w-full h-32 object-cover mb-2"
        />
        <h4 className="text-sm font-bold text-black mb-1">{item.headline}</h4>
        <span className="text-red-600 text-xs font-medium">
          | {item.category} |
        </span>
      </a>
    </div>
  );
}
