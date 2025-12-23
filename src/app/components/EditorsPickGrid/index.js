import { BrowserView, MobileView } from "react-device-detect";

export default function EditorsPickGrid({ items }) {
  const getCategoryColor = (category) => {
    const colors = {
      BUSINESS: "text-red-600",
      POLITICS: "text-red-600",
      LIFE: "text-red-600",
      ENTERTAINMENT: "text-red-600",
      CRIME: "text-red-600",
    };
    return colors[category] || "text-red-600";
  };

  return (
    <>
      <BrowserView>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {items
            .filter((item) => item.section === "Diaspora Voices")
            .slice(0, 5)
            .map((item, index) => (
              <a href={"/newsDetail/" + item._id} key={index}>
                <div
                  key={item.id}
                  className="text-center p-4 border-r border-gray-300 last:border-r-0"
                >
                  <h3 className="text-sm font-bold text-black mb-2 leading-tight">
                    {item.headline}
                  </h3>
                  <span
                    className={`text-xs font-medium ${getCategoryColor(
                      item.category
                    )}`}
                  >
                    | {item.category.toUpperCase()} |
                  </span>
                </div>
              </a>
            ))}
        </div>
      </BrowserView>
      <MobileView>
        <div className="space-y-4 mb-6">
          {items
            .filter((item) => item.section === "Diaspora Voices")
            .slice(0, 5)
            .map((item, index) => (
              <a
                href={`/newsDetail/${item._id}`}
                key={index}
                className="flex items-start border-b pb-4"
              >
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-black leading-snug mb-1">
                    {item.headline}
                  </h3>
                  <span
                    className={`text-xs font-medium ${getCategoryColor(
                      item.category
                    )}`}
                  >
                    | {item.category.toUpperCase()} |
                  </span>
                </div>
                <img
                  src={item.newsImageUrl || "/placeholder.svg"}
                  alt="thumbnail"
                  className="ml-3 w-16 h-16 object-cover rounded"
                />
              </a>
            ))}
        </div>
      </MobileView>
    </>
  );
}
