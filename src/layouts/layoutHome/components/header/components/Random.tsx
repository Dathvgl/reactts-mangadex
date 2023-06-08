import { useNavigate } from "react-router-dom";
import MangadexService from "~/models/MangadexService";

function HeaderRandom() {
  const navigate = useNavigate();

  async function onRandom() {
    const res = await MangadexService.mangaRandom();
    navigate(`/detail/${res?.id}`);
  }

  return (
    <>
      <button onClick={onRandom}>
        <li className="p-2 uppercase">Random</li>
      </button>
    </>
  );
}

export default HeaderRandom;
