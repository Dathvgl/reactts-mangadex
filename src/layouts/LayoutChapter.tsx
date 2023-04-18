import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, useOutletContext, useParams } from "react-router-dom";
import { server } from "~/main";
import { AggregateChapterMangadex, AggregateResponseMangadex } from "~/types";

function LayoutChapter() {
  const { mangaId, lang } = useParams();
  const [list, setList] = useState<AggregateChapterMangadex>();

  useEffect(() => {
    init();
  }, [mangaId]);

  async function init() {
    const res = await axios.get(
      `${server}/api/mangadex/chapterAll/${mangaId}`,
      { params: { lang } }
    );

    if (res.status == 200) {
      const data: AggregateResponseMangadex = res.data;
      if (data.result == "ok") {
        const map: AggregateChapterMangadex = {};

        const volumes = data.volumes || {};
        Object.keys(volumes).forEach((key) => {
          const chapters = volumes[key].chapters || {};
          Object.keys(chapters).forEach((child) => {
            map[child] = chapters[child];
          });
        });

        setList(() => map);
      }
    }
  }

  return (
    <>
      <Outlet context={{ list }} />
    </>
  );
}

export function useListVolume() {
  return useOutletContext<{ list: AggregateChapterMangadex }>();
}

export default LayoutChapter;
