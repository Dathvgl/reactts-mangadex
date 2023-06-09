import { Fragment } from "react";
import { Link } from "react-router-dom";
import CoverSrc from "~/components/CoverSrc";
import ISO6391 from "~/components/ISO6391";
import { chapterTitle, fromNow, keyDefault } from "~/globals";
import { useMangadexChapter } from "~/hooks/Mangadex";
import { MangaMangadex } from "~/types";

function NewsHome(props: { data: MangaMangadex[] }) {
  const { data } = props;

  if (data.length == 0) {
    return <></>;
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="text-xl font-bold text-orange-500">
          Truyện mới cập nhật
        </div>
        <div className="gap-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:w-[41rem]">
          {data.map((item, index) => (
            <Fragment key={index}>
              <NewItem item={item} />
            </Fragment>
          ))}
        </div>
      </div>
    </>
  );
}

function NewItem(props: { item: MangaMangadex }) {
  const { item } = props;
  const chapters = useMangadexChapter(item.id);

  return (
    <>
      <div className="max-md:flex max-md:justify-center">
        <figure className="w-full">
          <CoverSrc item={item} link={`/detail/${item.id}`} />
          <figcaption>
            <Link
              to={`/detail/${item.id}`}
              className="line-clamp-2 my-1 font-semibold hover:text-sky-600"
            >
              <ISO6391 str={item.attributes?.originalLanguage} />{" "}
              {keyDefault("en", item.attributes?.title)}
            </Link>
            {chapters && (
              <ul className="flex flex-col  bg-green-500 bg-opacity-10 divide-y-2 divide-black rounded">
                {chapters?.map((child, index) => (
                  <Fragment key={index}>
                    <li className="text-[13px] py-1 px-2 rounded hover:bg-black hover:bg-opacity-20 font-semibold flex flex-col justify-between items-center">
                      <div className="flex justify-between items-center w-full gap-2">
                        <Link
                          to={`/chapter/${item?.id}/${child.attributes?.translatedLanguage}/${child.id}/${child?.attributes?.chapter}`}
                          className="truncate hover:text-sky-600 flex-1"
                        >
                          {chapterTitle(
                            child?.attributes?.title,
                            child?.attributes?.chapter
                          )}
                        </Link>
                        <ISO6391 str={child.attributes?.translatedLanguage} />
                      </div>
                      {child.attributes?.volume ? (
                        <>
                          <div className="flex justify-between items-end w-full">
                            Vol: {child.attributes?.volume}
                            <i className="whitespace-nowrap text-[11px] text-gray-500">
                              {fromNow(child?.attributes?.updatedAt)}
                            </i>
                          </div>
                        </>
                      ) : (
                        <>
                          <i className="text-end w-full whitespace-nowrap text-[11px] text-gray-500">
                            {fromNow(child?.attributes?.updatedAt)}
                          </i>
                        </>
                      )}
                    </li>
                  </Fragment>
                ))}
              </ul>
            )}
          </figcaption>
        </figure>
      </div>
    </>
  );
}

export default NewsHome;
