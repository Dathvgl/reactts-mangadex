import { Fragment, useEffect, useRef, useState } from "react";
import { AiOutlineRead } from "react-icons/ai";
import { RxLapTimer } from "react-icons/rx";
import { Link } from "react-router-dom";
import ISO6391 from "~/components/ISO6391";
import Pagination from "~/components/Pagination";
import { capitalize, chapterTitle, fromNow } from "~/globals";
import MangadexService, { FeedType } from "~/models/MangadexService";
import { MangaMangadex } from "~/types";
import ScanlationItem from "./Scanlation";
import ItemFollow from "./Follow";

function ItemDetail(props: { item: MangaMangadex }) {
  const { item } = props;
  const baseOffset = 50;

  const ref = useRef<HTMLDivElement | null>(null);

  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [sort, setSort] = useState("desc");
  const [state, setState] = useState<FeedType>();

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
    setState(() => re?.data);
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
        <div className="flex flex-col lg:w-72 gap-4">
          {item.attributes?.publicationDemographic && (
            <>
              <div className="flex flex-col">
                <div className="font-bold mb-2">Demographic</div>
                <Link
                  to="/"
                  className="px-2 py-1 rounded-lg text-xs bg-slate-200 font-semibold w-fit hover:bg-orange-500 hover:bg-opacity-50"
                >
                  {capitalize(item.attributes?.publicationDemographic)}
                </Link>
              </div>
            </>
          )}
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
          <div className="flex justify-between items-center">
            <button
              className="px-2 py-1 rounded-lg bg-slate-200 font-semibold hover:bg-black hover:bg-opacity-20"
              onClick={() => {
                setSort(() => (sort == "asc" ? "desc" : "asc"));
              }}
            >
              {sort == "asc" ? <>Ascending</> : <>Descending</>}
            </button>
            <ItemFollow />
          </div>
          <br />
          <div ref={ref} className="flex flex-col gap-4 h-96 base-scrollbar">
            <ItemAll id={item.id} feed={state} />
          </div>
          <br />
          <div className="flex justify-center">
            <Pagination total={total} onPageChange={onPageChange} />
          </div>
        </div>
      </div>
    </>
  );
}

function ItemAll(props: { id?: string; feed?: FeedType }) {
  const { id, feed = {} } = props;

  function volumeDetail() {
    return (
      <>
        {Object.keys(feed).map((vol) => {
          const volume = vol.split("-")[0];
          return (
            <Fragment key={vol}>
              <div>
                <div className="font-bold">
                  {volume == "none" ? <>No Volume</> : <>Volume {vol}</>}
                </div>
                {chapterDetail(vol)}
              </div>
            </Fragment>
          );
        })}
      </>
    );
  }

  function chapterDetail(vol: string) {
    return (
      <div className="flex flex-col gap-2">
        {Object.keys(feed[vol]).map((ch) => {
          const { length } = Object.keys(feed[vol][ch]);
          const chapter = ch.split("-")[0];

          return (
            <Fragment key={`${vol}|${ch}`}>
              <div className="p-2 bg-black bg-opacity-10">
                {length == 1 ? (
                  <>{indexDetail(vol, ch)}</>
                ) : (
                  <>
                    <div className="font-bold">Chapter: {chapter}</div>
                    {indexDetail(vol, ch)}
                  </>
                )}
              </div>
            </Fragment>
          );
        })}
      </div>
    );
  }

  function indexDetail(vol: string, ch: string) {
    return (
      <div className="flex flex-col divide-y-2 divide-blue-200">
        {Object.keys(feed[vol][ch]).map((key) => {
          const { attributes, relationships } = feed[vol][ch][key];
          return (
            <Fragment key={`${vol}|${ch}|${key}`}>
              <div className="item-hover">
                <div className="flex justify-between items-center px-2 pt-1">
                  <div className="flex items-center gap-2">
                    <AiOutlineRead size={20} />
                    <Link
                      className="font-bold"
                      to={`/chapter/${id}/${attributes?.translatedLanguage}/${id}/${attributes?.chapter}`}
                    >
                      <ISO6391 str={attributes?.translatedLanguage} />{" "}
                      {chapterTitle(attributes?.title, attributes?.chapter)}
                    </Link>
                  </div>
                  <div className="w-40 flex items-center gap-1">
                    <RxLapTimer size={20} />
                    <div className="flex-1 text-gray-500 pl-1">
                      {fromNow(attributes?.updatedAt)}
                    </div>
                  </div>
                </div>
                <ScanlationItem relationships={relationships} />
              </div>
            </Fragment>
          );
        })}
      </div>
    );
  }

  return <>{volumeDetail()}</>;
}

export default ItemDetail;
