import { ChangeEvent, Fragment, useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import CoverSrc from "~/components/CoverSrc";
import ISO6391 from "~/components/ISO6391";
import useDebounce from "~/hooks/Debounce";
import { useMangadexChapter } from "~/hooks/Mangadex";
import { title } from "~/main";
import MangadexService from "~/models/MangadexService";
import { MangaMangadex } from "~/types";

function SearchLayoutHome() {
  const ref = useRef<HTMLInputElement | null>(null);
  const [state, setState] = useState<string>("");
  const [list, setList] = useState<MangaMangadex[]>();

  const title = useDebounce<string>(state);

  useEffect(() => {
    onSearch();
  }, [title]);

  async function onSearch() {
    if (!title) return;
    const res = await MangadexService.manga({ title });
    setList(() => res?.data);
  }

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setState(() => event.target.value);
  }

  function onClick() {
    ref.current?.focus();
    setState(() => "");
    setList(() => []);
  }

  return (
    <>
      <div className="relative">
        <div
          className={`bg-white ${
            state ? "rounded-tl rounded-tr" : "rounded"
          } overflow-hidden flex border border-black`}
        >
          <input
            ref={ref}
            value={state}
            className="flex-1 px-4 py-2 bg-transparent outline-0"
            placeholder="Tìm truyện"
            onChange={onChange}
          />
          {state && (
            <>
              <button
                className="h-auto px-2 hover:bg-black hover:bg-opacity-10"
                onClick={onClick}
              >
                <AiOutlineClose size={20} />
              </button>
            </>
          )}
        </div>
        {state && (
          <>
            <div className="absolute z-50 border border-black rounded-bl rounded-br divide-y-2 bg-white w-full h-80 base-scrollbar">
              {list?.map((item, index) => (
                <Fragment key={index}>
                  <SearchItem item={item} />
                </Fragment>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

function SearchItem(props: { item: MangaMangadex }) {
  const { item } = props;
  const chapter = useMangadexChapter(item.id, 1)?.[0];

  return (
    <>
      <Link
        className="flex gap-4 items-center p-2 hover:bg-black hover:bg-opacity-10"
        to={`/detail/${item.id}`}
      >
        <div className="w-16">
          <CoverSrc
            disableLink
            altHeight="h-16"
            item={item}
            link={`/detail/${item.id}`}
          />
        </div>
        <div className="flex-1 flex flex-col truncate">
          <div className="truncate font-bold">
            {title(item?.attributes?.title)}
          </div>
          {chapter && (
            <>
              <div className="flex items-center gap-2">
                <ISO6391 str={chapter.attributes?.translatedLanguage} />
                <div className="truncate text-sm">
                  Chapter {chapter.attributes?.chapter}
                </div>
              </div>
            </>
          )}
          <div className="truncate text-sm">
            {item.attributes?.tags?.map((item, index, { length }) => (
              <Fragment key={index}>
                {title(item.attributes?.name)}
                {index !== length - 1 && ", "}
              </Fragment>
            ))}
          </div>
        </div>
      </Link>
    </>
  );
}

export default SearchLayoutHome;
