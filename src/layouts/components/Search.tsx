import axios from "axios";
import { ChangeEvent, Fragment, useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import useDebounce from "~/hooks/Debounce";
import { useMangadexCover } from "~/hooks/Mangadex";
import { cover, server, title } from "~/main";
import {
  CoverResponseMangadex,
  MangaMangadex,
  MangaResponseMangadex,
} from "~/types";

function SearchLayoutHome() {
  const ref = useRef<HTMLInputElement | null>(null);
  const [state, setState] = useState<string>("");
  const [list, setList] = useState<MangaMangadex[]>([]);

  const search = useDebounce<string>(state);

  useEffect(() => {
    onSearch();
  }, [search]);

  async function onSearch() {
    if (search) {
      const res = await axios.get(
        `${server}/api/mangadex/search?title=${search}`
      );

      if (res.status == 200) {
        const data: MangaResponseMangadex = res.data;
        if (data.result == "ok") {
          setList(() => data.data ?? []);
        }
      }
    }
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
            <div className="absolute z-50 border border-black rounded-bl rounded-br divide-y-2 bg-white w-full h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-100 scroll-smooth">
              {list.map((item, index) => (
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
  const image = useMangadexCover(item);

  return (
    <>
      <Link
        className="flex gap-4 items-center p-2 hover:bg-black hover:bg-opacity-10"
        to="/"
      >
        <LazyLoadImage
          className="w-16 h-16 center-crop"
          effect="blur"
          src={image}
          alt="Error"
        />
        <div className="flex-1 flex flex-col truncate">
          <div className="truncate font-bold">
            {title(item?.attributes?.title)}
          </div>
          <div className="truncate text-sm">Chapter ???</div>
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
