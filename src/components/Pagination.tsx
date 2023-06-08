import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import ReactPaginate from "react-paginate";

type PaginationType = {
  total: number;
  onPageChange: ({ selected }: { selected: number }) => void;
};

function Pagination({ total, onPageChange }: PaginationType) {
  if (total == 1) return <></>;

  return (
    <ReactPaginate
      className="flex gap-4"
      pageLinkClassName="flex items-center justify-center px-2 font-bold rounded border border-black min-w-8 h-8 hover:bg-black hover:bg-opacity-10"
      activeLinkClassName="bg-orange-500"
      containerClassName="flex item-center justify-center"
      breakLinkClassName="flex items-center justify-center rounded w-8 h-8 hover:bg-black hover:bg-opacity-10"
      disabledLinkClassName="bg-gray-300"
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      pageCount={total}
      onPageChange={onPageChange}
      previousLabel={<GrFormPrevious size={30} />}
      previousLinkClassName="flex items-center justify-center rounded-full w-8 h-8 hover:bg-black hover:bg-opacity-10"
      nextLabel={<GrFormNext size={30} />}
      nextLinkClassName="flex items-center justify-center rounded-full w-8 h-8 hover:bg-black hover:bg-opacity-10"
    />
  );
}

export default Pagination;
