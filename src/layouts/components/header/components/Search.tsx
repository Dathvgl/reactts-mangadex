import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { server } from "~/main";
import { TagMangadex, TagResponseMangadex } from "~/types";

function HeaderSearch() {
  const [state, setState] = useState<TagMangadex[]>();

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const res = await axios.get(`${server}/api/mangadex/tag`);
    if (res.status == 200) {
      const data: TagResponseMangadex = res.data;
      if (data.result == "ok") {
        setState(() => data.data);
      }
    }
  }

  return (
    <>
      <div>Tag</div>
      <div className="group-hover/tag:block hidden absolute normal-case top-full left-0 container">
        <div className="text-black bg-white drop-shadow-lg grid grid-cols-fit-40">
          <div className="p-2">
            <Link className="text-purple-700 hover:text-red-500" to="/search">
              Advanced
            </Link>
          </div>
          {state
            ?.sort((a, b) => {
              const aKey = Object.keys(a.attributes?.name ?? {})[0];
              const bKey = Object.keys(b.attributes?.name ?? {})[0];
              const aName = a.attributes?.name?.[aKey];
              const bName = b.attributes?.name?.[bKey];
              return aName?.localeCompare(bName ?? "") ?? 0;
            })
            ?.map((item, index) => {
              const key = Object.keys(item.attributes?.name ?? {})[0];
              const name = item.attributes?.name?.[key];
              return (
                <Fragment key={index}>
                  <div className="p-2">
                    <Link
                      className="hover:text-red-500"
                      to="/search"
                      state={item}
                    >
                      {name}
                    </Link>
                  </div>
                </Fragment>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default HeaderSearch;
