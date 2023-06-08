import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MangadexService from "~/models/MangadexService";
import { UserMangadex } from "~/types";

function UserPage() {
  const { id } = useParams();
  const [user, setUser] = useState<UserMangadex>();

  useEffect(() => {
    init();
  }, [id]);

  async function init() {
    const res = await MangadexService.user(id);
    setUser(() => res);
  }

  return <></>;
}

export default UserPage;
