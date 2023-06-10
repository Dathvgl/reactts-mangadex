import { Fragment } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import remarkGfm from "remark-gfm";
import CoverSrc from "~/components/CoverSrc";
import { keyDefault } from "~/globals";
import { MangaMangadex } from "~/types";

function HeaderDetail(props: { item: MangaMangadex }) {
  const { item } = props;

  return (
    <>
      <div className="relative">
        <div className="absolute bg-slate-300 w-full h-1/2">
          <CoverSrc className="h-full blur-[2px]" disableLink item={item} />
        </div>
        <div className="flex max-md:flex-col z-40 px-5 pt-5 gap-4">
          <div className="w-52">
            <CoverSrc disableLink className="h-60" item={item} />
          </div>
          <div className="flex flex-col flex-1 justify-between gap-4 z-40">
            <div className="flex flex-col gap-4 justify-between h-full py-2">
              <div className="text-3xl text-white font-bold line-clamp-2 text-shadow-1">
                {keyDefault("en", item.attributes?.title)}
              </div>
              <div className="line-clamp-2">
                {keyDefault("en", item.attributes?.altTitles?.[0])}
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="flex flex-wrap gap-4 font-semibold">
        {item.attributes?.tags?.map((item, index) => (
          <Fragment key={index}>
            <Link
              to="/search"
              state={item}
              className="px-2 py-1 rounded-lg text-xs bg-slate-200"
            >
              {item.attributes?.name?.["en"] ?? ""}
            </Link>
          </Fragment>
        ))}
      </div>
      <br />
      <ReactMarkdown
        className="text-justify text-sm"
        children={item.attributes?.description?.["en"] ?? ""}
        remarkPlugins={[remarkGfm]}
      />
      <br />
    </>
  );
}

export default HeaderDetail;
