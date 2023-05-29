import { Outlet, useLocation } from "react-router-dom";
import HeaderLayoutHome from "./components/header/Header";
import FooterLayoutHome from "./components/Footer";

function LayoutHome() {
  return (
    <>
      <HeaderLayoutHome />
      <ContentLayoutHome />
      <FooterLayoutHome />
    </>
  );
}

function ContentLayoutHome() {
  const location = useLocation();
  const chapter = location.pathname.includes("/chapter");

  return (
    <>
      <div className={`${chapter ? "md:container" : "container"} mx-auto py-2`}>
        <Outlet />
      </div>
    </>
  );
}

export default LayoutHome;
