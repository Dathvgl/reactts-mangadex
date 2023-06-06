import { SyntheticEvent, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { useMangadexCover } from "~/hooks/Mangadex";
import { MangaMangadex } from "~/types";

type Props = {
  className?: string;
  disableLink?: boolean;
  link?: string;
  item: MangaMangadex;
};

function CoverSrc({ className, disableLink = false, item, link }: Props) {
  return (
    <>
      {disableLink ? (
        <CoverItem className={className} item={item} />
      ) : (
        <Link to={link ?? ""}>
          <CoverItem className={className} item={item} />
        </Link>
      )}
    </>
  );
}

function CoverItem(props: Props) {
  const { className, item } = props;

  const image = useMangadexCover(item);
  const [aspect, setAspect] = useState<number | undefined>();

  function onLoad(event: SyntheticEvent<HTMLImageElement, Event>) {
    const target = event.target as HTMLImageElement;
    const { width, height } = target;
    if (width > height) setAspect(() => 1);
    else setAspect(() => 0);
  }

  return (
    <>
      <div
        className={`w-full ${
          className ?? "h-44 max-sm:h-60"
        } relative overflow-hidden rounded-lg lazy-load-image`}
      >
        <LazyLoadImage
          effect="blur"
          className={`absolute max-w-none transform ${
            aspect == 0
              ? "w-full top-1/2 -translate-y-1/2"
              : aspect == 1
              ? "h-full left-1/2 -translate-x-1/2"
              : ""
          }`}
          src={image}
          alt="Error"
          onLoadCapture={onLoad}
        />
      </div>
    </>
  );
}

export default CoverSrc;
