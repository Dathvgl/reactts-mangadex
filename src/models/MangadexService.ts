import axios from "axios";
import { cover, server } from "~/globals";
import {
  AggregateChapterMangadex,
  AggregateResponseMangadex,
  ChaptersResponseMangadex,
  CoverResponseMangadex,
  ImageResponseMangadex,
  MangaResponseMangadex,
  MangaSearchMangadex,
  MangasResponseMangadex,
  TagResponseMangadex,
} from "~/types";

class MangadexService {
  static async manga(search?: MangaSearchMangadex) {
    const res = await axios.get(`${server}/api/mangadex/mangaSearch`, {
      params: { query: JSON.stringify(search) },
    });

    if (res.status != 200) return;
    const data: MangasResponseMangadex = res.data;

    if (data.result != "ok") return;
    return { total: data.total, data: data.data };
  }

  static async mangaDetail(mangaId?: string) {
    const res = await axios.get(`${server}/api/mangadex/manga/${mangaId}`);

    if (res.status != 200) return;
    const data: MangaResponseMangadex = res.data;

    if (data?.result != "ok") return;
    return data.data;
  }

  static async mangaTag() {
    const res = await axios.get(`${server}/api/mangadex/mangaTag`);
    if (res.status != 200) return;
    const data: TagResponseMangadex = res.data;

    if (data.result != "ok") return;
    return data.data;
  }

  static async mangaAggregate(mangaId?: string, lang?: string) {
    const res = await axios.get(
      `${server}/api/mangadex/mangaAggregate/${mangaId}`,
      { params: { lang } }
    );

    if (res.status != 200) return;
    const data: AggregateResponseMangadex = res.data;

    if (data.result != "ok") return;
    const map: AggregateChapterMangadex = {};

    const volumes = data.volumes || {};
    Object.keys(volumes).forEach((key) => {
      const chapters = volumes[key].chapters || {};
      Object.keys(chapters).forEach((child) => {
        map[child] = chapters[child];
      });
    });

    return map;
  }

  static async mangaFeed(mangaId?: string, query?: { [key: string]: unknown }) {
    const res = await axios.get(`${server}/api/mangadex/mangaFeed/${mangaId}`, {
      params: { query: JSON.stringify(query) },
    });

    if (res.status != 200) return;
    const data: ChaptersResponseMangadex = res.data;

    if (data.result != "ok") return;
    return { total: data.total, data: data.data };
  }

  static async cover(mangaId?: string, coverId?: string) {
    const res = await axios.get(`${server}/api/mangadex/cover/${coverId}`);
    if (res.status != 200) return;
    const data: CoverResponseMangadex = res.data;

    if (data.result != "ok") return;
    return cover(mangaId, data.data?.attributes?.fileName);
  }

  static async image(chapterId?: string) {
    const res = await axios.get(`${server}/api/mangadex/image/${chapterId}`);
    if (res.status != 200) return;
    const data: ImageResponseMangadex = res.data;
    return data.data;
  }

  static async home() {
    type DataType = {
      popularManga?: MangasResponseMangadex;
      newsChapter?: MangasResponseMangadex;
    };

    const res = await axios.get(`${server}/api/mangadex/home`);

    if (res.status != 200) return;
    const data: DataType = res.data;

    const result = {
      popular: data.popularManga?.result,
      news: data.newsChapter?.result,
    };

    if (result.popular != "ok" || result.news != "ok") return;
    return data;
  }
}

export default MangadexService;
