import Image from "next/image";
import { useEffect, useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";
export default function BottomSection({ ads }) {
  const [top, setTop] = useState(null);
  const [middle, setMiddle] = useState(null);
  const [bottom, setBottom] = useState(null);

  const filterAds = () => {
    let top = ads.filter((item) => item.adLocation === "HEADER_LEADERBOARD");
    let middle = ads.filter(
      (item) => item.adLocation === "TOP_STORIES_MIDDLE_RECTANGLE"
    );
    let bottom = ads.filter(
      (item) => item.adLocation === "TOP_STORIES_BOTTOM_LEADERBOARD"
    );
    setTop(top[0]);
    setMiddle(middle[0]);
    setBottom(bottom[0]);
  };

  useEffect(() => {
    filterAds();
  }, [ads, filterAds]);
  return (
    <center>
      <div className="mt-8">
        <div className=" text-white p-6 md:p-8 rounded-lg text-center">
          <>
            <BrowserView>
              {/* <center>
                <div
                  style={{
                    position: "relative",
                    width: "85%",
                    height: "90px",
                  }}
                >
                  <a href={bottom?.redirectUrl} target={"_blank"}>
                    <Image
                      src={bottom?.desktopImageUrl || "https//"}
                      alt=""
                      unoptimized
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </a>
                </div>
              </center> */}
            </BrowserView>
            {/* <MobileView>
              <a href={bottom?.redirectUrl} target={"_blank"}>
                <Image
                  src={bottom?.mobileImageUrl || "https//"}
                  alt=""
                  unoptimized
                  fill
                  style={{ objectFit: "cover" }}
                />
              </a>
            </MobileView> */}
          </>
        </div>
      </div>
    </center>
  );
}
