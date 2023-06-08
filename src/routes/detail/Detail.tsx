import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MangadexService from "~/models/MangadexService";
import { MangaMangadex } from "~/types";
import HeaderDetail from "./components/Header";
import ItemDetail from "./components/item/Item";

function DetailPage() {
  const { id } = useParams();
  const [state, setState] = useState<MangaMangadex>();

  useEffect(() => {
    init();
  }, [id]);

  async function init() {
    const res = await MangadexService.mangaDetail(id);
    setState(() => res);
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
