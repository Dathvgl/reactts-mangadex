import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AggregateChapterMangadex } from "~/types";

function ChapterButton(props: {
  children: React.ReactNode;
  className: string;
  id?: string;
  lang?: string;
  keyButton?: string;
  callback?: () => void;
  altIndex: number;
  chapter?: string;
  list: AggregateChapterMangadex;
}) {
  const {
    children,
    className,
    id,
    lang,
    keyButton,
    callback,
    altIndex,
    chapter,
    list,
  } = props;

  const navigate = useNavigate();

  const keys = Object.keys(list ?? {});
  const index = keys.indexOf(chapter ?? "") + altIndex;
  const check = index < 0 || index + 1 > keys.length;
  const obj = list?.[keys[check ? 0 : index]] ?? {};

  useEffect(() => {
    if (keyButton == "ArrowLeft" && altIndex == -1) {
      navigate(`/chapter/${id}/${lang}/${obj.id}/${obj.chapter}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    if (keyButton == "ArrowRight" && altIndex == 1) {
      navigate(`/chapter/${id}/${lang}/${obj.id}/${obj.chapter}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    if (keyButton) {
      callback?.();
    }
  }, [keyButton]);

  function onClick(event: React.MouseEvent<HTMLElement>) {
    if (check) {
      event.preventDefault();
    }
  }

  return (
    <>
      <Link
        to={`/chapter/${id}/${lang}/${obj.id}/${obj.chapter}`}
        className={`p-1 ${
          check ? "bg-gray-400" : "hover:bg-red-700 bg-red-500"
        } ${className}`}
        onClick={onClick}
      >
        {children}
      </Link>
    </>
  );
}

export default ChapterButton;
