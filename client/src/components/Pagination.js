import React from 'react';

export default function Pagination ({ showsPerPage, totalShows, currentPage, paginate }) {
  const pageNumbers = [];
  const visiblePage = 10;

  const startPage = () => {
    // When on the first page
    if (currentPage === 1) {
      return 1;
    }
    // When on the last page
    if (currentPage === showsPerPage) {
      return showsPerPage - visiblePage;
    }
    // When in between
    return currentPage - 1;
  }

  for (let i = startPage(); i <= Math.min(startPage() + visiblePage - 1, Math.ceil(totalShows/showsPerPage)); i++) {
    pageNumbers.push({
      name: i,
      isDisabled: i === currentPage
    });
  }

  // handle first page
  const onClickFirstPage = () => {
    paginate(1);
  }

  // handle previous page
  const onClickPreviousPage = () => {
    paginate(currentPage <= 1 ? 1 : (currentPage - 1));
  }

  // handle next page
  const onClickNextPage = () => {
    const lastpage = Math.ceil(totalShows/showsPerPage);
    paginate(currentPage < lastpage ? currentPage + 1 : lastpage);
  }

  // handle last page
  const onClickLastPage = () => {
    paginate(Math.ceil(totalShows/showsPerPage));
  }

  return (
    <div className="py-6">
      <ul className="flex flex-wrap rounded">
        <li className="m-1">
          <a onClick={() => onClickFirstPage()} href="#" className={`px-2 py-1 rounded block focus:outline-none bg-white text-gray-900 border`}>&lt;&lt;</a>
        </li>
        <li className="m-1">
          <a onClick={() => onClickPreviousPage()} href="#" className={`px-2 py-1 rounded block focus:outline-none bg-white text-gray-900 border`}>&lt;</a>
        </li>
        {pageNumbers.map((page, i) => (
          <li key={i} className="m-1">
            <a onClick={() => paginate(page.name)} href="#" className={`px-2 py-1 rounded block focus:outline-none ${page.name === currentPage ? 'bg-indigo-700 text-white border-none' : 'bg-white text-gray-900 border'}`}>{ page.name }</a>
          </li>
        ))}
        <li className="m-1">
          <a onClick={() => onClickNextPage()} href="#" className={`px-2 py-1 rounded block focus:outline-none bg-white text-gray-900 border`}>&gt;</a>
        </li>
        <li className="m-1">
          <a onClick={() => onClickLastPage()} href="#" className={`px-2 py-1 rounded block focus:outline-none bg-white text-gray-900 border`}>&gt;&gt;</a>
        </li>
      </ul>
    </div>
  )
}