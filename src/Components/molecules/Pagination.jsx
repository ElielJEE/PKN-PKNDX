import { usePagination } from "../hooks/index";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePlaying } from "../hooks";
import pikachuEffect from "/Sounds/pokemon-pika.mp3"

export default function Pagination({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  urlFilter
}) {
  const { audioEffectRef, handlePlayEffects } = usePlaying();

  const { paginationRange, DOTS } = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (currentPage > 1) {
      if (urlFilter !== "") {
        navigate(`/${urlFilter}/${currentPage}`);
      } else {
        navigate(`/${currentPage}`);
      }
    } else if (urlFilter !== "") {
      navigate(`/${urlFilter}/${currentPage}`);
    } else {
      navigate(`/`);
    }
  }, [navigate, currentPage, urlFilter]);

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul className="pagination-container">
      <li
        className={
          currentPage === 1
            ? "pagination-item__arrow disabled"
            : "pagination-item__arrow"
        }
        onClick={onPrevious}
      >
        <audio src={pikachuEffect} ref={audioEffectRef} />
        <div className="arrow left" onClick={handlePlayEffects} />
        {currentPage === 1 && (
          <span className="arrow-text__left">No more!</span>
        )}
      </li>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <li className="pagination-item__dots" key={`dots-${index}`}>
              &#8230;
            </li>
          );
        }
        return (
          <li
            className={
              pageNumber === currentPage
                ? "pagination-item selected"
                : "pagination-item"
            }
            onClick={() => onPageChange(pageNumber)}
            key={pageNumber}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={
          currentPage === lastPage
            ? "pagination-item__arrow disabled"
            : "pagination-item__arrow"
        }
        onClick={onNext}
      >
        <audio src={pikachuEffect} ref={audioEffectRef} />
        <div className="arrow right" onClick={handlePlayEffects} />
        {currentPage === lastPage && (
          <span className="arrow-text__right">No more!</span>
        )}
      </li>
    </ul>
  );
}

Pagination.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  totalCount: PropTypes.number.isRequired,
  siblingCount: PropTypes.number,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  urlFilter: PropTypes.string.isRequired,
};
