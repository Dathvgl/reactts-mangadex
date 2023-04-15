import { Fragment } from "react";
import { Link } from "react-router-dom";

function FollowHome() {
  return (
    <>
      <div className="text-xl font-bold text-orange-500">Truyện theo dõi</div>
      {Array.from(Array(5)).map((item, index) => (
        <Fragment key={index}>
          <div className="flex gap-4 mt-4">
            <Link to="/detail">
              <img
                className="w-16 aspect-square center-crop rounded-lg"
                src="https://st.nettruyenvt.com/data/comics/121/chung-cuc-dau-la.jpg"
                alt="Error"
              />
            </Link>
            <div className="flex-1 flex flex-col">
              <Link
                to="/"
                className="line-clamp-1 font-semibold hover:text-sky-600"
              >
                Tiêu đề
              </Link>
              <div className="text-sm flex justify-between items-center gap-2">
                <Link to="/" className="truncate hover:text-sky-600">
                  Chapter 100000
                </Link>
                <i className="whitespace-nowrap text-xs text-gray-500">
                  8 giờ trước
                </i>
              </div>
              <Link to="/" className="truncate hover:text-sky-600">
                <i className="text-xs text-gray-500">Đọc tiếp Chapter 10000</i>
              </Link>
            </div>
          </div>
        </Fragment>
      ))}
    </>
  );
}

export default FollowHome;
