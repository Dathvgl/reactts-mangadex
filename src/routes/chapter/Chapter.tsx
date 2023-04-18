import axios from "axios";
import { Fragment, useEffect, useRef, useState } from "react";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useParams } from "react-router-dom";
import { useListVolume } from "~/layouts/LayoutChapter";
import { server } from "~/main";
import { AggregateChapterMangadex, ImageResponseMangadex } from "~/types";

function ChapterPage() {
  const { mangaId, lang, chapterId, chapter } = useParams();
  const { list } = useListVolume();
  const ref = useRef<HTMLSelectElement | null>(null);
  const [state, setState] = useState<string[]>([]);

  useEffect(() => {
    init();
  }, [chapterId]);

  useEffect(() => {
    if (ref.current) {
      ref.current.value = chapter ?? "";
    }
  }, [chapter]);

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
      <div className="flex flex-col gap-4">
        <div className="flex justify-center item-center gap-2">
          <ChapterButton
            className="rounded-tl-lg  rounded-bl-lg"
            id={mangaId}
            lang={lang}
            altIndex={-1}
            chapter={chapter}
            list={list}
          >
            <GrFormPreviousLink size={25} />
          </ChapterButton>
          <select ref={ref} defaultValue={chapter} className="w-20 border">
            {Object.keys(list ?? {}).reverse().map((key, index) => (
              <Fragment key={index}>
                <option value={list[key].chapter}>{key}</option>
              </Fragment>
            ))}
          </select>
          <ChapterButton
            className="rounded-tr-lg  rounded-br-lg"
            id={mangaId}
            lang={lang}
            altIndex={1}
            chapter={chapter}
            list={list}
          >
            <GrFormNextLink size={25} />
          </ChapterButton>
        </div>
        <div className="flex flex-col items-center">
          {state.map((item, index) => (
            <Fragment key={index}>
              <LazyLoadImage effect="blur" src={item} alt="Error" />
            </Fragment>
          ))}
        </div>
      </div>
    </>
  );
}

function ChapterButton(props: {
  children: React.ReactNode;
  className: string;
  id?: string;
  lang?: string;
  altIndex: number;
  chapter?: string;
  list: AggregateChapterMangadex;
}) {
  const { children, className, id, lang, altIndex, chapter, list } = props;

  const keys = Object.keys(list ?? {});
  const index = keys.indexOf(chapter ?? "") + altIndex;
  const check = index < 0 || index + 1 > keys.length;
  const obj = list?.[keys[check ? 0 : index]] ?? {};

  function onClick(event: React.MouseEvent<HTMLElement>) {
    if (check) {
      event.preventDefault();
    }
  }

  return (
    <>
      <Link
        to={`/chapter/${id}/${lang}/${obj.id}/${obj.chapter}`}
        className={`p-1 ${
          check ? "bg-gray-400" : "hover:bg-red-700 bg-red-500"
        } ${className}`}
        onClick={onClick}
      >
        {children}
      </Link>
    </>
  );
}

export default ChapterPage;
