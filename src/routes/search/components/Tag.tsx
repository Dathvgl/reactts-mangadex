import { Fragment } from "react";
import { useCollapse } from "react-collapsed";
import SpanBox from "~/components/SpanBox";
import { capitalize } from "~/globals";
import { TagMangadex } from "~/types";

function SearchTag(props: {
  base?: string;
  title: string;
  list: TagMangadex[];
  callback: (str: string, id: string) => void;
}) {
  const { base, title, list, callback } = props;
  const { getCollapseProps, getToggleProps } = useCollapse({
    defaultExpanded: true,
  });

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="font-bold" {...getToggleProps()}>
          {capitalize(title)}
        </div>
        <div {...getCollapseProps()}>
          <div className="grid grid-cols-fit-40 gap-y-4 text-sm">
            {list.map((item, index) => {
              const obj = item.attributes?.name ?? {};
              const name = obj[Object.keys(obj)[0]];
              return (
                <Fragment key={index}>
                  <div className="flex gap-2 items-center select-none">
                    <SpanBox base={base == item.id} onChange={(str) => callback(str, item.id ?? "")} />
                    <div>{name}</div>
                  </div>
                </Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchTag;
