import { Fragment, useEffect, useRef, useState } from "react";
import { AiOutlineZoomIn, AiOutlineZoomOut } from "react-icons/ai";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate, useParams } from "react-router-dom";
import useLocalStorage from "~/hooks/LocalStorage";
import { useListVolume } from "~/layouts/LayoutChapter";
import MangadexService from "~/models/MangadexService";
import ChapterButton from "./components/Button";

function ChapterPage() {
  const { mangaId, lang, chapterId, chapter } = useParams();
  const navigate = useNavigate();

  const { list } = useListVolume();
  const { getLocal, setLocal } = useLocalStorage<string>("chapterZoom");

  const refTop = useRef<HTMLSelectElement | null>(null);
  const refBot = useRef<HTMLSelectElement | null>(null);

  const [state, setState] = useState<string[]>();
  const [keyCode, setKeyCode] = useState("");

  const [chapterZoom, setChapterZoom] = useState(
    Number.parseInt(getLocal() ?? "100")
  );

  useEffect(() => {
    if (!getLocal()) {
      setLocal(chapterZoom.toString());
    }

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
    const res = await MangadexService.image(chapterId);
    setState(() => res);
  }

  function callback() {
    setKeyCode(() => "");
  }

  function onChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const item = list[event.target.value];
    navigate(`/chapter/${mangaId}/${lang}/${item.id}/${item.chapter}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function onZoom(num: number) {
    const result = chapterZoom + 5 * num;
    if (result <= 0 || result > 100) return;
    setLocal(result.toString());
    setChapterZoom(() => result);
  }

  if (state?.length == 0) {
    return <></>;
  }

  return (
    <>
      <div className="fixed bottom-10 right-10 flex gap-2 max-[960px]:hidden z-50">
        <button
          className="rounded-full p-2 border border-black drop-shadow-lg center-flex item-hover"
          onClick={() => onZoom(1)}
        >
          <AiOutlineZoomIn size={20} />
        </button>
        <button
          className="rounded-full p-2 border border-black drop-shadow-lg center-flex item-hover"
          onClick={() => onZoom(-1)}
        >
          <AiOutlineZoomOut size={20} />
        </button>
      </div>
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
            value={chapter}
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
        <div className="w-100 flex justify-center">
          <div
            style={{ width: `${chapterZoom}%` }}
            className="flex flex-col items-center"
          >
            {state?.map((item, index) => (
              <Fragment key={index}>
                <LazyLoadImage effect="blur" src={item} alt="Error" />
              </Fragment>
            ))}
          </div>
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
            value={chapter}
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
