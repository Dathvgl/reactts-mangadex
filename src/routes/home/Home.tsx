import axios from "axios";
import { useEffect, useState } from "react";
import { server } from "~/main";
import { MangaMangadex, MangaResponseMangadex } from "~/types";
import SliderHome from "./components/Slider";
import FollowHome from "./components/Follow";
import NewsHome from "./components/News";

type DataType = {
  popularManga?: MangaResponseMangadex;
  newsChapter?: MangaResponseMangadex;
};

function HomePage() {
  const [slider, setSlider] = useState<MangaMangadex[]>([]);
  const [news, setNews] = useState<MangaMangadex[]>([]);
  
  useEffect(() => {
    init();
  }, []);
  
  async function init() {
    const res = await axios.get(`${server}/api/mangadex/home`);
    if (res.status == 200) {
      const data: DataType = res.data;

      if (data.popularManga?.result == "ok") {
        setSlider(() => data.popularManga?.data ?? []);
      }

      if (data.newsChapter?.result == "ok") {
        setNews(() => data.newsChapter?.data ?? []);
      }
    }
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
