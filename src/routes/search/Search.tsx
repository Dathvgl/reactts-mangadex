import { Fragment, useEffect, useRef, useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import ReactPaginate from "react-paginate";
import { useLocation } from "react-router-dom";
import MangadexService from "~/models/MangadexService";
import {
  MangaMangadex,
  MangaSearchMangadex,
  TagMangadex
} from "~/types";
import SearchItem from "./components/Item";
import SearchTag from "./components/Tag";

function SearchPage() {
  const { state } = useLocation();
  const tagState: string | undefined = state?.id;
  const baseOffset = 20;

  const ref = useRef<HTMLDivElement | null>(null);

  const [tag, setTag] = useState<{ [key: string]: TagMangadex[] }>();
  const [search, setSearch] = useState<MangaSearchMangadex>({
    limit: baseOffset,
    offset: 0,
    includedTags: tagState == undefined ? undefined : [tagState],
  });

  const [total, setTotal] = useState(0);
  const [list, setList] = useState<MangaMangadex[]>();

  useEffect(() => {
    if (!tag) base();
    init();
  }, [search]);

  async function base() {
    const res = await MangadexService.mangaTag();
    const list = res
      ?.sort((a, b) => {
        const aKey = Object.keys(a.attributes?.name ?? {})[0];
        const bKey = Object.keys(b.attributes?.name ?? {})[0];
        const aName = a.attributes?.name?.[aKey];
        const bName = b.attributes?.name?.[bKey];
        return aName?.localeCompare(bName ?? "") ?? 0;
      })
      .reduce((acc: Record<string, TagMangadex[]>, item) => {
        if (!acc[item.attributes?.group ?? ""]) {
          acc[item.attributes?.group ?? ""] = [];
        }

        acc[item.attributes?.group ?? ""].push(item);
        return acc;
      }, {});

    setTag(() => list);
  }

  async function init() {
    const res = await MangadexService.manga(search);
    setTotal(() => Math.ceil((res?.total ?? 0) / baseOffset));
    setList(() => res?.data);
  }

  function checkTag(str: string, id: string) {
    switch (str) {
      case "include": {
        setSearch(() => ({
          ...search,
          offset: 0,
          includedTags: [...(search?.includedTags ?? []), id],
        }));
        break;
      }
      case "exclude": {
        const list = search.includedTags?.filter((item) => item != id);
        setSearch(() => ({
          ...search,
          offset: 0,
          includedTags: list?.length == 0 ? undefined : list,
          excludedTags: [...(search?.excludedTags ?? []), id],
        }));
        break;
      }
      default: {
        const list = search.excludedTags?.filter((item) => item != id);
        setSearch(() => ({
          ...search,
          offset: 0,
          excludedTags: list?.length == 0 ? undefined : list,
        }));
        break;
      }
    }
  }

  function onPageChange(selectedItem: { selected: number }) {
    const { selected } = selectedItem;
    setSearch(() => ({ ...search, offset: selected * baseOffset }));

    if (ref.current) {
      window.scrollTo({ top: ref.current?.offsetTop - 40, behavior: "smooth" });
    }
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        {Object.keys(tag ?? {}).map((key, index) => {
          const list = tag?.[key] ?? [];
          return (
            <Fragment key={index}>
              <SearchTag
                base={tagState}
                title={key}
                list={list}
                callback={checkTag}
              />
            </Fragment>
          );
        })}
      </div>
      <br />
      <br />
      <div
        ref={ref}
        className="gap-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
      >
        {list?.map((item, index) => (
          <Fragment key={index}>
            <SearchItem item={item} />
          </Fragment>
        ))}
      </div>
      <br />
      <div className="flex justify-center">
        <ReactPaginate
          className="flex gap-4"
          pageLinkClassName="flex items-center justify-center px-2 font-bold rounded border border-black min-w-8 h-8 hover:bg-black hover:bg-opacity-10"
          activeLinkClassName="bg-orange-500"
          containerClassName="flex item-center justify-center"
          breakLinkClassName="flex items-center justify-center rounded w-8 h-8 hover:bg-black hover:bg-opacity-10"
          disabledLinkClassName="bg-gray-300"
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          pageCount={total}
          onPageChange={onPageChange}
          previousLabel={<GrFormPrevious size={30} />}
          previousLinkClassName="flex items-center justify-center rounded-full w-8 h-8 hover:bg-black hover:bg-opacity-10"
          nextLabel={<GrFormNext size={30} />}
          nextLinkClassName="flex items-center justify-center rounded-full w-8 h-8 hover:bg-black hover:bg-opacity-10"
        />
      </div>
    </>
  );
}

export default SearchPage;
