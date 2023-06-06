import { Outlet, useLocation } from "react-router-dom";
import HeaderLayoutHome from "./components/header/Header";
import FooterLayoutHome from "./components/Footer";
import { ToastContainer } from "react-toastify";

function LayoutHome() {
  return (
    <>
      <HeaderLayoutHome />
      <ContentLayoutHome />
      <FooterLayoutHome />
      <ToastContainer position="bottom-left" autoClose={2000} />
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
