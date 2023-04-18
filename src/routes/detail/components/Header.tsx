import { Fragment } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { useMangadexCover } from "~/hooks/Mangadex";
import { title } from "~/main";
import { MangaMangadex } from "~/types";

function HeaderDetail(props: { item: MangaMangadex }) {
  const { item } = props;

  const image = useMangadexCover(item);

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
                <div className="text-3xl">{title(item.attributes?.title)}</div>
                <div>{title(item.attributes?.altTitles?.[0])}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="flex flex-wrap gap-4 font-semibold">
        {item.attributes?.tags?.map((item, index) => (
          <Fragment key={index}>
            <Link to="/" className="px-2 py-1 rounded-lg text-xs bg-slate-200">
              {item.attributes?.name?.["en"] ?? ""}
            </Link>
          </Fragment>
        ))}
      </div>
      <br />
      <div className="text-justify text-sm">
        {item.attributes?.description?.["en"]}
      </div>
      <br />
    </>
  );
}

export default HeaderDetail;
