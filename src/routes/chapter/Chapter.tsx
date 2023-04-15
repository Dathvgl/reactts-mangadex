import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useParams } from "react-router-dom";
import { server } from "~/main";
import {
  ChapterMangadex,
  ChaptersResponseMangadex,
  ImageResponseMangadex,
} from "~/types";

function ChapterPage() {
  const { mangaId, lang, chapterId } = useParams();
  const [state, setState] = useState<string[]>([]);
  const [list, setList] = useState<ChapterMangadex[]>([]);

  useEffect(() => {
    init();
  }, [chapterId]);

  async function test() {
    const res = await axios.get(
      `${server}/api/mangadex/chapterAll/${mangaId}`,
      { params: { offset: 0, lang } }
    );
    if (res.status == 200) {
      const data: ChaptersResponseMangadex = res.data;
      setList(() => data.data || []);
    }
  }

  async function init() {
    const res = await axios.get(`${server}/api/mangadex/image/${chapterId}`);
    if (res.status == 200) {
      const data: ImageResponseMangadex = res.data;
      setState(() => data.data || []);
    }
  }

  if (state.length == 0) {
    return <></>;
  }

  return (
    <>
      <ChapterItem item={state} />
    </>
  );
}

function ChapterItem(props: { item: string[] }) {
  const { item } = props;
  return (
    <>
      <div className="flex flex-col items-center">
        {item.map((item, index) => (
          <Fragment key={index}>
            <LazyLoadImage effect="blur" src={item} alt="Error" />
          </Fragment>
        ))}
      </div>
    </>
  );
}

export default ChapterPage;
