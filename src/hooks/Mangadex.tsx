import { useEffect, useState } from "react";
import MangadexService from "~/models/MangadexService";
import { ChapterMangadex, MangaMangadex } from "~/types";

export function useMangadexCover(item: MangaMangadex) {
  const [state, setState] = useState<string>();

  useEffect(() => {
    init();
  }, [item]);

  async function init() {
    const coverId = item.relationships?.find(
      ({ type }) => type == "cover_art"
    )?.id;

    const res = await MangadexService.cover(item.id, coverId);
    setState(() => res);
  }

  return state;
}

export function useMangadexChapter(id?: string, limit: number = 3) {
  if (id == undefined) return undefined;
  const [state, setState] = useState<ChapterMangadex[]>();

  useEffect(() => {
    init();
  }, [id]);

  async function init() {
    const res = (await MangadexService.mangaFeed(
      id,
      {
        limit,
        order: { updatedAt: "desc" },
      },
      true
    )) as ChapterMangadex[];

    setState(() => res);
  }

  return state;
}
