"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";

export default function Index() {
  const [spotify, setSpotify] = useState(null);
  const getContent = () => {
    axios
      .get("http://api.xdiasporamedia.com/api/informative/")
      .then((response) => {
        console.log(response.data); // Handle successful response
        let res = response.data;
        console.log("res========>", res.data.spotify);
        setSpotify(res.data.spotify);
      })
      .catch((error) => {
        console.error(error); // Handle error
      });
  };

  useEffect(() => {
    getContent();
  }, []);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: spotify }}
      className="mb-2 w-full"
    ></div>
  );
}
