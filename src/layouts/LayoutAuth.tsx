import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "~/redux/store";

function LayoutAuth() {
  const isUser = useAppSelector((state) => state.auth.isUser);
  return isUser ? <Outlet /> : <Navigate to="/" />;
}

export default LayoutAuth;
