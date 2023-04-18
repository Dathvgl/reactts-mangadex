import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import ISO6391 from "~/components/ISO6391";
import { server } from "~/main";
import {
  ChapterMangadex,
  ChaptersResponseMangadex,
  MangaMangadex,
} from "~/types";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

function ItemDetail(props: { item: MangaMangadex }) {
  const { item } = props;
  const baseOffset = 50;

  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [sort, setSort] = useState("desc");
  const [state, setState] = useState<ChapterMangadex[]>([]);

  useEffect(() => {
    init();
  }, [item.id, sort, offset]);

  async function init() {
    const res = await axios.get(
      `${server}/api/mangadex/mangaChapter/${item.id}`,
      { params: { limit: 50, offset, sort } }
    );

    if (res.status == 200) {
      const data: ChaptersResponseMangadex = res.data;
      if (data.result == "ok") {
        setTotal(() => (data.total ?? 0) / baseOffset);
        setState(() => data.data ?? []);
      }
    }
  }

  function onPageChange(selectedItem: { selected: number }) {
    const { selected } = selectedItem;
    setOffset(() => selected * baseOffset);
  }

  return (
    <>
      <div className="mt-4 flex">
        <div className="flex flex-col w-72">
          <div className="font-bold mb-2">Demographic</div>
          <Link
            to="/"
            className="px-2 py-1 rounded-lg text-xs bg-slate-200 font-semibold w-fit hover:bg-orange-500 hover:bg-opacity-50"
          >
            {item.attributes?.publicationDemographic}
          </Link>
          <br />
          <div className="font-bold">Alternative Titles</div>
          {item.attributes?.altTitles?.map((item, index) => {
            const key = Object.keys(item)[0];
            return (
              <Fragment key={index}>
                <div className="flex gap-4">
                  <ISO6391 str={key} /> {item[key]}
                </div>
              </Fragment>
            );
          })}
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
          <div className="flex flex-col gap-4 h-96 base-scrollbar">
            <ItemAll id={item.id} sort={sort} item={state} />
          </div>
          <br />
          <div className="flex justify-center">
            <ReactPaginate
              className="flex gap-4"
              pageLinkClassName="flex items-center justify-center font-bold rounded border border-black w-8 h-8 hover:bg-black hover:bg-opacity-10"
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
type VolumeChildType = { [key: string]: { children: JSX.Element[] } };

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
      <Link
        to={`/chapter/${id}/${attributes?.translatedLanguage}/${item.id}/${attributes?.chapter}`}
      >
        <ISO6391 str={attributes?.translatedLanguage} />{" "}
        {attributes?.title ? (
          <>{attributes?.title}</>
        ) : (
          <>Ch. {attributes?.chapter}</>
        )}
      </Link>
    );

    const volume = attributes?.volume ?? "none";
    const chapter = attributes?.chapter ?? "0";

    if (!volumes[volume]) {
      volumes[volume] = { [chapter]: { children: [] } };
      volumes[volume][chapter].children.push(
        <Fragment key={index}>{child}</Fragment>
      );
    } else if (!volumes[volume][chapter]) {
      volumes[volume][chapter] = { children: [] };
      volumes[volume][chapter].children.push(
        <Fragment key={index}>{child}</Fragment>
      );
    } else {
      volumes[volume][chapter].children.push(
        <Fragment key={index}>{child}</Fragment>
      );
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
                      {chapter.children.map((item, index) => (
                        <Fragment key={index}>{item}</Fragment>
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
