import clsx from "clsx";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

const PaginationComponent = ({
  currentPage,
  totalPages,
  onNext,
  onPrevious,
  onSelectedPage,
}: {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  onSelectedPage: (page: number) => void;
}) => {
  const firstPage = 0;
  const lastPage = totalPages > 0 ? totalPages - 1 : 0;
  const middlePages = Array.from(Array(totalPages).keys()).slice(1, lastPage);
  const MAX_ITEMS_TO_SHOW = 3; // The amount of items to show besides first and last page
  const getItemsToRender = () => {
    if (totalPages <= MAX_ITEMS_TO_SHOW + 2) {
      // Include first and last page
      return middlePages;
    }
    if (currentPage >= 0 && currentPage < MAX_ITEMS_TO_SHOW) {
      return middlePages.slice(0, MAX_ITEMS_TO_SHOW);
    }
    if (
      currentPage >= MAX_ITEMS_TO_SHOW &&
      currentPage < totalPages - MAX_ITEMS_TO_SHOW
    ) {
      return middlePages.slice(currentPage - 2, currentPage + 1); // Get the previous and the next page of the current page
    }
    if (currentPage >= lastPage - MAX_ITEMS_TO_SHOW) {
      return middlePages.slice(-MAX_ITEMS_TO_SHOW);
    }
  };

  return (
    <Pagination className="h-8 pb-6">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={onPrevious} />
        </PaginationItem>
        <div className="flex flex-row w-[20rem] items-center justify-center">
          <PaginationItem
            className={clsx({
              "border border-slate-400 rounded": currentPage === firstPage,
            })}
          >
            <PaginationLink onClick={() => onSelectedPage(firstPage)}>
              {firstPage + 1}
            </PaginationLink>
          </PaginationItem>
          {currentPage - firstPage >= MAX_ITEMS_TO_SHOW && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {...(getItemsToRender() ?? []).map((value) => (
            <PaginationItem
              className={clsx({
                "border border-slate-400 rounded": currentPage === value,
              })}
            >
              <PaginationLink onClick={() => onSelectedPage(value)}>
                {value + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          {lastPage - currentPage >= MAX_ITEMS_TO_SHOW && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {lastPage !== firstPage && (
            <PaginationItem
              className={clsx({
                "border border-slate-400 rounded": currentPage === lastPage,
              })}
            >
              <PaginationLink onClick={() => onSelectedPage(lastPage)}>
                {lastPage + 1}
              </PaginationLink>
            </PaginationItem>
          )}
        </div>
        <PaginationItem>
          <PaginationNext onClick={onNext} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
