import { useEffect, useState } from "react";
import { BsPeopleFill, BsPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import MangadexService from "~/models/MangadexService";
import { GroupMangadex, RelationshipMangadex, UserMangadex } from "~/types";

function ScanlationItem(props: { relationships?: RelationshipMangadex[] }) {
  const { relationships } = props;
  const [group, setGroup] = useState<GroupMangadex>();
  const [user, setUser] = useState<UserMangadex>();

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const groupId = relationships?.find(
      (item) => item.type == "scanlation_group"
    )?.id;

    const resGroup = await MangadexService.group(groupId);
    setGroup(() => resGroup);

    const userId = relationships?.find((item) => item.type == "user")?.id;

    const resUser = await MangadexService.user(userId);
    setUser(() => resUser);
  }

  return (
    <>
      <div className="flex justify-between items-center px-2 pb-1">
        <Link
          className="flex items-center gap-2"
          to={`/info/group/${group?.id}`}
        >
          <BsPeopleFill size={20} />
          <div className="px-1 rounded item-hover">
            {group?.attributes?.name ?? "None"}
          </div>
        </Link>
        <Link
          className="w-40 flex items-center gap-1"
          to={`/info/user/${user?.id}`}
        >
          <BsPersonFill size={20} />
          <div className="truncate text-green-500 font-semibold w-fit px-1 rounded item-hover">
            {user?.attributes?.username ?? "None"}
          </div>
        </Link>
      </div>
    </>
  );
}

export default ScanlationItem;
