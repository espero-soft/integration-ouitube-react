/*
  Author: Mudey Formation
  Website: https://mudey.fr/
  App Name: E-commerce with React.Js
  Created At: 01/11/2023 08:22:46
*/
import React, { FC, useEffect } from 'react';
import './Pagination.css';

interface PaginationProps {
  pageNumbers: number[];
  currentPage: number;
  handleSelect: (value: number) => void;
}

const Pagination: FC<PaginationProps> = ({ pageNumbers, currentPage, handleSelect }) => {
  const visiblePages = 5; // Nombre de pages visibles à la fois
  const totalPageCount = pageNumbers.length;

  useEffect(() => {
    // window.scrollTo(0, 0);
  }, []);

  const handlePrevious = () => {
    if (currentPage > 1) {
      handleSelect(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPageCount) {
      handleSelect(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    if (totalPageCount <= visiblePages) {
      return pageNumbers.map((number) => renderPageItem(number));
    }

    const middleIndex = Math.floor(visiblePages / 2);
    const startPage = Math.max(1, currentPage - middleIndex);
    const endPage = Math.min(totalPageCount, startPage + visiblePages - 1);

    const pagesToShow = pageNumbers.slice(startPage - 1, endPage);

    if (startPage > 1) {
      pagesToShow.unshift(1);
    }
    if (endPage < totalPageCount) {
      pagesToShow.push(totalPageCount);
    }

    return pagesToShow.map((number) => renderPageItem(number));
  };

  const renderPageItem = (number: number) => (
    <li
      key={number}
      className={number === currentPage ? 'page-item active shadow' : 'page-item shadow'}
    >
      <a className="page-link" onClick={() => handleSelect(number)}>
        {number}
      </a>
    </li>
  );

  return (
    <div className="Pagination pt-2 pb-2 ">
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className={currentPage === 1 ? 'page-item disabled' : 'page-item'}>
            <a className="page-link" onClick={handlePrevious}>
              Previous
            </a>
          </li>
          {renderPageNumbers()}
          <li className={currentPage === totalPageCount ? 'page-item disabled' : 'page-item'}>
            <a className="page-link" onClick={handleNext}>
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
