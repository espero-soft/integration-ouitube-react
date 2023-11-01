/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 01/11/2023 08:22:46
*/
import React, { FC, useEffect } from 'react';
import './Pagination.css';


interface PaginationProps {
  pageNumbers: any[],
  currentPage: number,
  handleSelect: (value: number) => void,
}


const Pagination: FC<PaginationProps> = ({ pageNumbers, currentPage, handleSelect }) => {



  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {

    }
    runLocalData()
  })

  return (
    <div className="Pagination pt-2 pb-2 ">
      <nav aria-label="Page navigation example">
        
        <ul className="pagination">
          {pageNumbers.map((number: any) => (
            <li key={number} className={number === currentPage ? 'page-item active shadow' : 'page-item shadow'}>
              <a className="page-link" onClick={() => handleSelect(number)}>{number}</a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;