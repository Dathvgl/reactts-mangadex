import moment from "moment";
import { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutHome from "~/layouts/LayoutHome";
import LayoutChapter from "~/layouts/LayoutChapter";

import "./index.css";
import "flag-icons/css/flag-icons.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-lazy-load-image-component/src/effects/blur.css";

const HomePage = lazy(() => import("~/routes/home/Home"));
const DetailPage = lazy(() => import("~/routes/detail/Detail"));
const ChapterPage = lazy(() => import("~/routes/chapter/Chapter"));
const SearchPage = lazy(() => import("~/routes/search/Search"));
const ErrorPage = lazy(() => import("~/routes/Error"));

// ABCDEFGHIJKLMNOPQRSTUVWXYZ
export const server: string = import.meta.env.VITE_SERVER;

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const title = (obj?: { [key: string]: string }) => {
  if (obj) {
    const key = Object.keys(obj)[0];
    return obj[key];
  }

  return "";
};

export const cover = (id: string, name: string) =>
  `https://uploads.mangadex.org/covers/${id}/${name}`;

export function fromNow(str?: string) {
  const date = moment(str).fromNow();
  return capitalize(date);
}

function Loading() {
  return (
    <>
      <div>...</div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
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
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);
