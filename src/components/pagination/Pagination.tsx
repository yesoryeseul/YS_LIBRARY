import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

interface PageProps {
  total_count: number;
  pageable_count: number;
  // is_end: boolean;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PageProps> = ({
  total_count,
  pageable_count,
  onPageChange,
}) => {
  const totalPages = Math.ceil(pageable_count / 10);

  // 페이지 숫자 배열 생성
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ul>
        {pageNumbers.map((pageNumber) => (
          <li key={pageNumber}>
            <button onClick={() => onPageChange(pageNumber)}>
              {pageNumber}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
