import { useEffect, useState } from "react";
import MangadexService from "~/models/MangadexService";
import { MangaMangadex } from "~/types";
import FollowHome from "./components/Follow";
import NewsHome from "./components/News";
import SliderHome from "./components/Slider";

function HomePage() {
  const [slider, setSlider] = useState<MangaMangadex[]>([]);
  const [news, setNews] = useState<MangaMangadex[]>([]);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const res = await MangadexService.home();
    setSlider(() => res?.popularManga?.data ?? []);
    setNews(() => res?.newsChapter?.data ?? []);
  }

  return (
    <>
      <SliderHome data={slider} />
      <br />
      <div className="lg:flex lg:gap-4">
        <NewsHome data={news} />
        <div className="w-96 hidden lg:block">
          <FollowHome />
        </div>
      </div>
    </>
  );
}

export default HomePage;
