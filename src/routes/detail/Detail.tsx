import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "~/main";
import { MangaMangadex, ResultMangadex } from "~/types";
import HeaderDetail from "./components/Header";
import ItemDetail from "./components/Item";

type DataType = ResultMangadex & {
  data?: MangaMangadex;
};

function DetailPage() {
  const { id } = useParams();
  const [state, setState] = useState<MangaMangadex>();

  useEffect(() => {
    init();
  }, [id]);

  async function init() {
    const res = await axios.get(`${server}/api/mangadex/manga/${id}`);

    if (res.status == 200) {
      const data: DataType = res.data;
      if (data?.result == "ok") {
        setState(() => data.data);
      }
    }
  }

  if (state == undefined) {
    return <></>;
  }

  return (
    <>
      <HeaderDetail item={state} />
      <ItemDetail item={state} />
    </>
  );
}

export default DetailPage;
