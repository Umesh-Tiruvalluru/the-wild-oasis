import { useSearchParams } from "react-router-dom";
import { Button } from "./button";
import { TableCell, TableRow } from "./table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PAGE_SIZE } from "@/utils/constants";

const Pagination = ({ count }: { count: number }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  // count =24
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const pageCount = Math.ceil(count / PAGE_SIZE);

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set("page", String(prev));
    setSearchParams(searchParams);
  }

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    searchParams.set("page", String(next));
    setSearchParams(searchParams);
  }

  if (pageCount <= 1) return null;

  return (
    <TableRow className="p-4">
      <TableCell colSpan={5}>
        <p className="text-base font-normal">
          Showing{" "}
          <span className="font-semibold">{(currentPage - 1) * 10 + 1} </span>
          of <span className="font-semibold">{count}</span> results
        </p>
      </TableCell>
      <TableCell className="flex items-center justify-end gap-2">
        <Button variant="ghost" onClick={prevPage} className="">
          <ChevronLeft />
          Previous
        </Button>
        <Button variant="ghost" onClick={nextPage}>
          Next
          <ChevronRight />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default Pagination;
