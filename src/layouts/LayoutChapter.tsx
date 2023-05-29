import { useEffect, useState } from "react";
import { Outlet, useOutletContext, useParams } from "react-router-dom";
import MangadexService from "~/models/MangadexService";
import { AggregateChapterMangadex } from "~/types";

function LayoutChapter() {
  const { mangaId, lang } = useParams();
  const [list, setList] = useState<AggregateChapterMangadex>();

  useEffect(() => {
    init();
  }, [mangaId]);

  async function init() {
    const res = await MangadexService.mangaAggregate(mangaId, lang);
    setList(() => res);
  }

  return <Outlet context={{ list }} />;
}

export function useListVolume() {
  return useOutletContext<{ list: AggregateChapterMangadex }>();
}

export default LayoutChapter;
