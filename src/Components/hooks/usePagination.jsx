import React, { useMemo } from "react";

export default function usePagination(params) {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);
    const totalPageNumbers = siblingCount + 5;
    if (totalPageNumbers >= totalPageCount) {
      
    }
  })
  return {

  };
}
