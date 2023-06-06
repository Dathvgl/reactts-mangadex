import { useEffect, useRef, useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { logout } from "~/redux/slices/auth";
import { useAppDispatch, useAppSelector } from "~/redux/store";

function HeaderUser() {
  const isUser = useAppSelector((state) => state.auth.isUser);

  return (
    <>
      {isUser ? (
        <HeaderUserIcon />
      ) : (
        <Link
          to="/auth/signin"
          className="h-10 aspect-square bg-white border-[1px] border-black rounded-full flex items-center justify-center"
        >
          <BsFillPersonFill size={25} />
        </Link>
      )}
    </>
  );
}

function HeaderUserIcon() {
  const dispatch = useAppDispatch();
  const divRef = useRef<HTMLDivElement>(null);
  const [drop, setDrop] = useState(false);

  useEffect(() => {
    const handle = (event: MouseEvent) => {
      const target = event.target as Node;
      if (!divRef.current?.contains(target)) onDrop();
    };

    document.addEventListener("click", handle);
    return () => {
      document.removeEventListener("click", handle);
    };
  }, []);

  function onDrop() {
    setDrop(() => !drop);
  }

  return (
    <>
      <div ref={divRef} className="relative">
        <button
          className="h-10 aspect-square bg-white rounded-full flex items-center justify-center"
          onClick={onDrop}
        >
          <BsFillPersonFill size={25} />
        </button>
        {drop && (
          <ul className="absolute w-40 flex flex-col divide-y-2 divide-blue-500 bg-slate-50 rounded border z-50 right-0 top-12 whitespace-nowrap">
            <li className="px-2 py-1 item-hover">
              <Link to="/">Profile</Link>
            </li>
            <li className="px-2 py-1 item-hover">
              <button onClick={() => dispatch(logout())}>Sign out</button>
            </li>
          </ul>
        )}
      </div>
    </>
  );
}

export default HeaderUser;
