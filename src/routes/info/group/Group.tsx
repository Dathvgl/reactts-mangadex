import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MangadexService from "~/models/MangadexService";
import { GroupMangadex } from "~/types";

function GroupPage() {
  const { id } = useParams();
  const [group, setGroup] = useState<GroupMangadex>();

  useEffect(() => {
    init();
  }, [id]);

  async function init() {
    const res = await MangadexService.group(id);
    setGroup(() => res);
  }

  return <></>;
}

export default GroupPage;
