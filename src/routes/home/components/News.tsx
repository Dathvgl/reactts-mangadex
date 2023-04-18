import { Fragment } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import ISO6391 from "~/components/ISO6391";
import { useMangadexChapter, useMangadexCover } from "~/hooks/Mangadex";
import { fromNow, title } from "~/main";
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
          {/* <NewItem item={data[2]} /> */}
        </div>
      </div>
    </>
  );
}

function NewItem(props: { item: MangaMangadex }) {
  const { item } = props;

  const image = useMangadexCover(item);
  const chapters = useMangadexChapter(item.id);

  return (
    <>
      <div className="max-md:flex max-md:justify-center">
        <figure className="max-lg:w-fit">
          <div className="relative">
            <Link
              to={`/detail/${item.id}`}
              className="lazy-load-image w-full flex center-crop"
            >
              <LazyLoadImage
                effect="blur"
                className="rounded-lg w-full h-44"
                src={image}
                alt="Error"
              />
            </Link>
            <div className="absolute text-gray-300 text-md p-1 w-full bg-black bg-opacity-50 bottom-0 rounded-bl-lg rounded-br-lg">
              Haha
            </div>
          </div>
          <figcaption>
            <Link
              to={`/detail/${item.id}`}
              className="line-clamp-2 my-1 font-semibold hover:text-sky-600"
            >
              {title(item.attributes?.title)}
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
                          Chapter: {child?.attributes?.chapter}
                        </Link>
                        <ISO6391 str={child.attributes?.translatedLanguage} />
                      </div>
                      {child.attributes?.volume ? (
                        <>
                          <div className="flex justify-between items-end w-full">
                            Vl: {child.attributes?.volume}
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
