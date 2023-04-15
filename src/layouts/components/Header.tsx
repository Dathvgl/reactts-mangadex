import SearchLayoutHome from "./Search";
import { Link } from "react-router-dom";

function HeaderLayoutHome() {
  return (
    <>
      <div className="bg-blue-500">
        <div className="container mx-auto py-4 grid grid-cols-4 items-center">
          <div
            style={{ WebkitTextStroke: "black 0.5px" }}
            className="text-2xl font-bold select-none bg-gradient-to-r from-yellow-600 via-pink-600 to-blue-600 bg-clip-text text-transparent"
          >
            <Link to="/">fsfssfssfsfsfs</Link>
          </div>
          <div className="col-span-2">
            <SearchLayoutHome />
          </div>
          <div className="text-end">User</div>
        </div>
      </div>
      <div className="bg-black sticky top-0 z-40">
        <div className="container mx-auto">
          <ul className="text-white uppercase font-semibold flex divide-x-2 divide-gray-500">
            <Link to="/" className="hover:text-orange-500">
              <li className="p-2">hot</li>
            </Link>
            <li className="p-2">Theo dõi</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default HeaderLayoutHome;
