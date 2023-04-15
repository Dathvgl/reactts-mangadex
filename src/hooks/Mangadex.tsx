import axios from "axios";
import { useEffect, useState } from "react";
import { server, cover } from "~/main";
import {
  ChapterMangadex,
  ChaptersResponseMangadex,
  CoverResponseMangadex,
  MangaMangadex,
} from "~/types";

export function useMangadexCover(item: MangaMangadex) {
  const [state, setState] = useState("");

  useEffect(() => {
    init();
  }, [item]);

  async function init() {
    const coverId = item.relationships?.find(
      ({ type }) => type == "cover_art"
    )?.id;

    if (coverId) {
      const res = await axios.get(`${server}/api/mangadex/cover/${coverId}`);
      if (res.status == 200) {
        const data: CoverResponseMangadex = res.data;
        if (data.result == "ok") {
          const id = item.id ?? "";
          const name = data.data?.attributes?.fileName ?? "";
          setState(() => cover(id, name));
        }
      }
    }
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
    const res = await axios.get(`${server}/api/mangadex/chapter/${id}`, {
      params: { limit },
    });
    if (res.status == 200) {
      const data: ChaptersResponseMangadex = res.data;
      if (data.result == "ok") {
        setState(() => data.data);
      }
    }
  }

  return state;
}
