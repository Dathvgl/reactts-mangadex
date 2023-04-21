import axios from "axios";
import { Fragment, useEffect, useRef, useState } from "react";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate, useParams } from "react-router-dom";
import { useListVolume } from "~/layouts/LayoutChapter";
import { server } from "~/main";
import { ImageResponseMangadex } from "~/types";
import ChapterButton from "./components/Button";

function ChapterPage() {
  const { mangaId, lang, chapterId, chapter } = useParams();
  const navigate = useNavigate();
  const { list } = useListVolume();
  const refTop = useRef<HTMLSelectElement | null>(null);
  const refBot = useRef<HTMLSelectElement | null>(null);
  const [state, setState] = useState<string[]>([]);
  const [keyCode, setKeyCode] = useState("");

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key == "ArrowLeft") {
        setKeyCode(() => event.key);
      } else if (event.key == "ArrowRight") {
        setKeyCode(() => event.key);
      }
    }

    window.addEventListener("keyup", handleKey);
    return () => {
      window.removeEventListener("keyup", handleKey);
    };
  }, []);

  useEffect(() => {
    init();
  }, [chapterId]);

  useEffect(() => {
    if (refTop.current && refBot.current) {
      refTop.current.value = chapter ?? "";
      refBot.current.value = chapter ?? "";
    }
  }, [chapter]);

  async function init() {
    const res = await axios.get(`${server}/api/mangadex/image/${chapterId}`);
    if (res.status == 200) {
      const data: ImageResponseMangadex = res.data;
      setState(() => data.data || []);
    }
  }

  function callback() {
    setKeyCode(() => "");
  }

  function onChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const item = list[event.target.value];
    navigate(`/chapter/${mangaId}/${lang}/${item.id}/${item.chapter}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
            keyButton={keyCode}
            callback={callback}
            altIndex={-1}
            chapter={chapter}
            list={list}
          >
            <GrFormPreviousLink size={25} />
          </ChapterButton>
          <select
            ref={refTop}
            onChange={onChange}
            defaultValue={chapter}
            className="w-20 border"
          >
            {Object.keys(list ?? {})
              .reverse()
              .map((key, index) => (
                <Fragment key={index}>
                  <option value={list[key].chapter}>{key}</option>
                </Fragment>
              ))}
          </select>
          <ChapterButton
            className="rounded-tr-lg  rounded-br-lg"
            id={mangaId}
            lang={lang}
            keyButton={keyCode}
            callback={callback}
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
          <select
            ref={refBot}
            onChange={onChange}
            defaultValue={chapter}
            className="w-20 border"
          >
            {Object.keys(list ?? {})
              .reverse()
              .map((key, index) => (
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
      </div>
    </>
  );
}

export default ChapterPage;
