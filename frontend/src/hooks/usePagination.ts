import { useCallback, useState } from "react";

const usePagination = (totalPages: number | undefined) => {
  const [page, setPage] = useState(0);

  const incrementPage = useCallback(() => {
    if (page + 1 < (totalPages ?? 0 - 1)) {
      setPage((page) => page + 1);
    }
  }, [page, totalPages]);

  const decrementPage = useCallback(() => {
    if (page - 1 >= 0) {
      setPage((page) => page - 1);
    }
  }, [page]);
  return {
    page,
    setPage,
    incrementPage,
    decrementPage,
  };
};

export default usePagination;
