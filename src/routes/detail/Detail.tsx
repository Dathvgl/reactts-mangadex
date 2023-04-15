import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useParams } from "react-router-dom";
import { useMangadexCover } from "~/hooks/Mangadex";
import { server, title } from "~/main";
import {
  ChapterMangadex,
  ChaptersResponseMangadex,
  MangaMangadex,
  ResultMangadex,
} from "~/types";

type DataType = {
  manga?: ResultMangadex & {
    data?: MangaMangadex;
  };
  chapters?: ChaptersResponseMangadex;
};

type ItemType = {
  manga: MangaMangadex;
  chapters: ChapterMangadex[];
};

function DetailPage() {
  const { id } = useParams();
  const [state, setState] = useState<ItemType>();
  const [sort, setSort] = useState("desc");

  useEffect(() => {
    init();
  }, [id]);

  async function init() {
    const res = await axios.get(
      `${server}/api/mangadex/manga/${id}?sort=${sort}`
    );

    if (res.status == 200) {
      const data: DataType = res.data;
      if (data.manga?.result == "ok" && data.chapters?.result == "ok") {
        setState(() => ({
          manga: data!.manga!.data!,
          chapters: data!.chapters!.data!,
        }));
      }
    }
  }

  if (state == undefined) {
    return <></>;
  }

  return (
    <>
      <DetailItem item={state} />
    </>
  );
}

function DetailItem(props: { item: ItemType }) {
  const { manga, chapters } = props.item;

  const image = useMangadexCover(manga);

  function chapterAll() {
    const volumes: { [key: string]: { children: JSX.Element[] } } = {};
    const list: JSX.Element[] = [];

    chapters.forEach((item, index) => {
      const child = (
        <Link
          to={`/chapter/${manga.id}/${item.attributes?.translatedLanguage}/${item.id}`}
        >
          Chapter {item.attributes?.chapter} - {item.attributes?.title} -{" "}
          {item.attributes?.translatedLanguage}
        </Link>
      );

      const volume = item.attributes?.volume ?? "0";
      if (!volumes[volume]) {
        volumes[volume] = { children: [] };
        volumes[volume].children.push(<Fragment key={index}>{child}</Fragment>);
      } else
        volumes[volume].children.push(<Fragment key={index}>{child}</Fragment>);
    });

    Object.keys(volumes).forEach((key, index) => {
      list.push(
        <Fragment key={index}>
          <div>
            <div>{key == "0" ? <>No Volume</> : <>Volume {key}</>}</div>
            <div className="flex flex-col">{volumes[key].children}</div>
          </div>
        </Fragment>
      );
    });

    return <>{list}</>;
  }

  return (
    <>
      <div className="relative">
        <div>
          <div className="flex">
            <LazyLoadImage
              className="w-52"
              effect="blur"
              src={image}
              alt="Error"
            />
            <div className="ml-4 flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-4">
                <div className="text-3xl">{title(manga.attributes?.title)}</div>
                <div>{title(manga.attributes?.altTitles?.[0])}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="flex flex-wrap gap-4 font-semibold">
        {manga.attributes?.tags?.map((item, index) => (
          <Fragment key={index}>
            <Link to="/" className="px-2 py-1 rounded-lg text-xs bg-slate-200">
              {item.attributes?.name?.["en"] ?? ""}
            </Link>
          </Fragment>
        ))}
      </div>
      <br />
      <div className="text-justify text-sm">
        {manga.attributes?.description?.["en"]}
      </div>
      <br />
      <div className="flex flex-col gap-4">{chapterAll()}</div>
    </>
  );
}

export default DetailPage;
