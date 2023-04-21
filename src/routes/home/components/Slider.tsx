import { Fragment } from "react";
import { Link } from "react-router-dom";
import Slider, { Settings } from "react-slick";
import CoverSrc from "~/components/CoverSrc";
import { useMangadexChapter } from "~/hooks/Mangadex";
import { fromNow, title } from "~/main";
import { MangaMangadex } from "~/types";

function SliderHome(props: { data: MangaMangadex[] }) {
  const { data } = props;

  const settings: Settings = {
    swipe: true,
    swipeToSlide: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    // prevArrow: <GrPrevious />,
    // nextArrow: <GrNext />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (data.length == 0) {
    return <></>;
  }

  return (
    <>
      <div className="text-xl font-bold text-orange-500">Truyện đề cử</div>
      <Slider {...settings}>
        {data.map((item, index) => (
          <Fragment key={index}>
            <SliderItem item={item} />
          </Fragment>
        ))}
      </Slider>
    </>
  );
}

function SliderItem(props: { item: MangaMangadex }) {
  const { item } = props;
  const chapter = useMangadexChapter(item.id, 1)?.[0];

  return (
    <>
      <div className="p-2">
        <div className="relative w-fit">
          <div className="w-36 lg:w-40 xl:w-44">
            <CoverSrc item={item} link={`/detail/${item.id}`} />
          </div>
          <div className="absolute text-white text-md p-1 w-full bg-black bg-opacity-70 bottom-0 rounded-bl-lg rounded-br-lg">
            <Link
              to={`/detail/${item.id}`}
              className="line-clamp-1 text-center font-semibold hover:text-sky-600"
            >
              {title(item.attributes?.title)}
            </Link>
            <div className="text-sm flex justify-between items-center gap-2">
              {chapter && (
                <>
                  <Link
                    to={`/chapter/${item?.id}/${chapter.attributes?.translatedLanguage}/${chapter.id}/${chapter?.attributes?.chapter}`}
                    className="truncate hover:text-sky-600"
                  >
                    Chapter {chapter.attributes?.chapter}
                  </Link>
                </>
              )}
              <i className="whitespace-nowrap text-xs ">
                {fromNow(item.attributes?.updatedAt)}
              </i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SliderHome;
