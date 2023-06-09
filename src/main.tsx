import { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutChapter from "~/layouts/LayoutChapter";
import LayoutHome from "~/layouts/layoutHome/LayoutHome";
import { store } from "~/redux/store";
import { lazyCustom } from "./components/LazyCustom";

import "flag-icons/css/flag-icons.min.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-toastify/dist/ReactToastify.min.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./index.css";

const HomePage = lazyCustom(() => import("~/routes/home/Home"));
const DetailPage = lazyCustom(() => import("~/routes/detail/Detail"));
const ChapterPage = lazyCustom(() => import("~/routes/chapter/Chapter"));
const SearchPage = lazyCustom(() => import("~/routes/search/Search"));
const SignInPage = lazyCustom(() => import("~/routes/login/SignIn"));
const SignUpPage = lazyCustom(() => import("~/routes/login/SignUp"));
const ErrorPage = lazyCustom(() => import("~/routes/Error"));
const GroupPage = lazyCustom(() => import("~/routes/info/group/Group"));
const UserPage = lazyCustom(() => import("~/routes/info/user/User"));

// ABCDEFGHIJKLMNOPQRSTUVWXYZ
function Loading() {
  return <div>...</div>;
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<LayoutHome />}>
            <Route index element={<HomePage />} />
            <Route path="detail/:id" element={<DetailPage />} />
            <Route path="chapter/:mangaId/:lang" element={<LayoutChapter />}>
              <Route path=":chapterId/:chapter" element={<ChapterPage />} />
            </Route>
            <Route path="search" element={<SearchPage />} />
            <Route path="auth">
              <Route path="signin" element={<SignInPage />} />
              <Route path="signup" element={<SignUpPage />} />
            </Route>
            <Route path="info">
              <Route path="group" element={<GroupPage />} />
              <Route path="user" element={<UserPage />} />
            </Route>
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </Provider>
);
