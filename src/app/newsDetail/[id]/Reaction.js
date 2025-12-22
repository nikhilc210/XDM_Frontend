import { useState, useEffect } from "react";
import axios from "axios";

const reactionsList = [
  "😊 Happy",
  "😍 Love",
  "😂 Funny",
  "😢 Sad",
  "😠 Angry",
  "👍 Like",
];

const BASE_URL = "https://api.xdiasporamedia.com/api/reactions"; // Your backend URL

export default function Reactions({ id }) {
  const [counts, setCounts] = useState({});

  // Fetch reaction counts on load
  useEffect(() => {
    if (!id) return;

    axios
      .get(`${BASE_URL}/${id}`)
      .then((res) => setCounts(res.data))
      .catch((err) => console.error("Axios GET error:", err));
  }, [id]);

  // Handle emoji click
  const handleReaction = async (label) => {
    if (!id) return;

    try {
      const res = await axios.post(`${BASE_URL}/${id}`, {
        type: label,
      });
      setCounts(res.data);
    } catch (err) {
      console.error("Axios POST error:", err);
    }
  };

  return (
    <div className="pt-6">
      <h3 className="text-lg font-semibold text-center mb-4">
        What's your reaction?
      </h3>
      <div className="flex justify-center gap-4 flex-wrap">
        {reactionsList.map((reaction) => {
          const [emoji, label] = reaction.split(" ");
          return (
            <div key={label} className="text-center">
              <button
                className="text-2xl p-2 hover:scale-110 transition"
                onClick={() => handleReaction(label)}
              >
                {emoji}
              </button>
              <p className="text-xs mt-1 font-medium">{label}</p>
              <p className="text-xs text-gray-500">{counts[label] ?? 0}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
