import { Fragment, useEffect, useRef, useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import ISO6391 from "~/components/ISO6391";
import { capitalize, chapterTitle, fromNow } from "~/globals";
import MangadexService from "~/models/MangadexService";
import { ChapterMangadex, MangaMangadex } from "~/types";

function ItemDetail(props: { item: MangaMangadex }) {
  const { item } = props;
  const baseOffset = 50;

  const ref = useRef<HTMLDivElement | null>(null);

  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [sort, setSort] = useState("desc");
  const [state, setState] = useState<ChapterMangadex[]>([]);

  useEffect(() => {
    init();
  }, [item.id, sort, offset]);

  async function init() {
    const re = await MangadexService.mangaFeed(item.id, {
      limit: baseOffset,
      offset,
      order: { volume: sort, chapter: sort },
    });

    setTotal(() => Math.ceil((re?.total ?? 0) / baseOffset));
    setState(() => re?.data ?? []);
  }

  function onPageChange(selectedItem: { selected: number }) {
    const { selected } = selectedItem;
    setOffset(() => selected * baseOffset);

    if (ref.current) {
      ref.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }

  return (
    <>
      <div className="mt-4 flex max-lg:flex-col gap-4">
        <div className="flex flex-col lg:w-72">
          {item.attributes?.publicationDemographic && (
            <>
              <div className="font-bold mb-2">Demographic</div>
              <Link
                to="/"
                className="px-2 py-1 rounded-lg text-xs bg-slate-200 font-semibold w-fit hover:bg-orange-500 hover:bg-opacity-50"
              >
                {capitalize(item.attributes?.publicationDemographic)}
              </Link>
            </>
          )}
          <br />
          <div className="p-2 bg-slate-100 rounded">
            <div className="font-bold">Alternative Titles</div>
            {item.attributes?.altTitles
              ?.sort((a, b) => {
                const aKey = Object.keys(a)[0];
                const bKey = Object.keys(b)[0];
                return aKey.localeCompare(bKey);
              })
              ?.map((item, index) => {
                const key = Object.keys(item)[0];
                return (
                  <Fragment key={index}>
                    <div className="flex gap-4 truncate">
                      <ISO6391 str={key} />
                      <div className="flex-1 truncate">{item[key]}</div>
                    </div>
                  </Fragment>
                );
              })}
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex">
            <button
              className="px-2 py-1 rounded-lg bg-slate-200 font-semibold hover:bg-black hover:bg-opacity-20"
              onClick={() => {
                setSort(() => (sort == "asc" ? "desc" : "asc"));
              }}
            >
              {sort == "asc" ? <>Ascending</> : <>Descending</>}
            </button>
          </div>
          <br />
          <div ref={ref} className="flex flex-col gap-4 h-96 base-scrollbar">
            <ItemAll id={item.id} sort={sort} item={state} />
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
        </div>
      </div>
    </>
  );
}

type VolumeType = { [key: string]: VolumeChildType };
type VolumeItemType = { lang?: string; child: JSX.Element };
type VolumeChildType = { [key: string]: { children: VolumeItemType[] } };

function ItemAll(props: {
  id?: string;
  sort: string;
  item: ChapterMangadex[];
}) {
  const { id, sort, item } = props;
  const volumes: VolumeType = {};
  const list: JSX.Element[] = [];

  item.forEach((item, index) => {
    const { attributes } = item;
    const child = (
      <>
        <div className="flex justify-between items-center">
          <Link
            to={`/chapter/${id}/${attributes?.translatedLanguage}/${item.id}/${attributes?.chapter}`}
          >
            <ISO6391 str={attributes?.translatedLanguage} />{" "}
            {chapterTitle(attributes?.title, attributes?.chapter)}
          </Link>
          <i className="whitespace-nowrap text-[11px] text-gray-500">
            {fromNow(attributes?.updatedAt)}
          </i>
        </div>
      </>
    );

    const volume = attributes?.volume ?? "none";
    const chapter = attributes?.chapter ?? "0";

    if (!volumes[volume]) {
      volumes[volume] = { [chapter]: { children: [] } };
      volumes[volume][chapter].children.push({
        lang: attributes?.translatedLanguage,
        child: <Fragment key={index}>{child}</Fragment>,
      });
    } else if (!volumes[volume][chapter]) {
      volumes[volume][chapter] = { children: [] };
      volumes[volume][chapter].children.push({
        lang: attributes?.translatedLanguage,
        child: <Fragment key={index}>{child}</Fragment>,
      });
    } else {
      volumes[volume][chapter].children.push({
        lang: attributes?.translatedLanguage,
        child: <Fragment key={index}>{child}</Fragment>,
      });
    }
  });

  ObjectKey<VolumeType>(volumes, sort).forEach((key, index) => {
    const volume = volumes[key];
    const child = (
      <Fragment key={index}>
        <div>
          <div className="font-bold">
            {key == "none" ? <>No Volume</> : <>Volume {key}</>}
          </div>
          <div className="flex flex-col gap-2">
            {ObjectKey<VolumeChildType>(volume, sort).map((key, index) => {
              const chapter = volume[key];
              return (
                <Fragment key={index}>
                  <div className="p-2 bg-black bg-opacity-10">
                    <div className="font-bold">Chapter: {key}</div>
                    <div className="flex flex-col divide-y-2 divide-blue-200">
                      {chapter.children
                        .sort(
                          (a, b) => a.lang?.localeCompare(b.lang ?? "") ?? 0
                        )
                        .map((item, index) => (
                          <Fragment key={index}>
                            <div className="px-2 py-1 item-hover">
                              {item.child}
                            </div>
                          </Fragment>
                        ))}
                    </div>
                  </div>
                </Fragment>
              );
            })}
          </div>
        </div>
      </Fragment>
    );

    list.push(child);
  });

  return <>{list}</>;
}

function ObjectKey<T extends {}>(obj: T, sort: string) {
  if (sort == "asc") return Object.keys(obj);
  else return Object.keys(obj).reverse();
}

export default ItemDetail;
