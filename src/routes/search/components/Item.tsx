import { Fragment } from "react";
import { Link } from "react-router-dom";
import CoverSrc from "~/components/CoverSrc";
import ISO6391 from "~/components/ISO6391";
import { chapterTitle, fromNow, keyDefault } from "~/globals";
import { useMangadexChapter } from "~/hooks/Mangadex";
import { MangaMangadex } from "~/types";

function SearchItem(props: { item: MangaMangadex }) {
  const { item } = props;

  const chapters = useMangadexChapter(item.id);

  return (
    <>
      <figure className="w-full">
        <CoverSrc
          className="h-44 max-sm:h-48"
          item={item}
          link={`/detail/${item.id}`}
        />
        <figcaption>
          <Link
            to={`/detail/${item.id}`}
            className="line-clamp-2 my-1 font-semibold hover:text-sky-600"
          >
            {keyDefault("en", item.attributes?.title)}
          </Link>
          {chapters && (
            <ul className="flex flex-col  bg-green-500 bg-opacity-10 divide-y-2 divide-black rounded">
              {chapters?.map((child, index) => (
                <Fragment key={index}>
                  <li className="text-[13px] py-1 px-2 rounded hover:bg-black hover:bg-opacity-20 font-semibold flex flex-col justify-between items-center">
                    <div className="flex justify-between items-center w-full">
                      <Link
                        to={`/chapter/${item?.id}/${child.attributes?.translatedLanguage}/${child.id}/${child?.attributes?.chapter}`}
                        className="truncate hover:text-sky-600"
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
    </>
  );
}
export default SearchItem;
