import { Outlet } from "react-router-dom";
import HeaderLayoutHome from "./components/Header";

function LayoutHome() {
  return (
    <>
      <HeaderLayoutHome />
      <ContentLayoutHome />
    </>
  );
}

function ContentLayoutHome() {
  return (
    <>
      <div className="container mx-auto py-2">
        <Outlet />
      </div>
    </>
  );
}

export default LayoutHome;
