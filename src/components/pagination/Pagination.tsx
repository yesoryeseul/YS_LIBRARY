import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

interface PageProps {
  total_count: number;
  pageable_count: number;
  // is_end: boolean;
  onPageChange: (pageNumber: number, newSize: number) => void;
  sizes: number;
}

const Pagination: React.FC<PageProps> = ({
  total_count,
  pageable_count,
  onPageChange,
  sizes,
}) => {
  const totalPages = Math.ceil(pageable_count / sizes); // 총 페이지 개수
  const [currentPage, setCurrentPage] = useState(1);
  const [currentGroup, setCurrentGroup] = useState(1);

  // 페이지 숫자 배열 생성
  const pagePerGroup = 10; // 그룹당 페이지 개수
  const totalGroups = Math.ceil(totalPages / pagePerGroup); // 그룹 개수

  const pageNumbers = Array(totalPages)
    .fill(0)
    .map((_, idx) => idx + 1);

  // 이전 그룹 이동
  const onGoPrevGroup = () => {
    if (currentGroup > 1) {
      setCurrentGroup(currentGroup - 1);
      setCurrentPage((currentGroup - 2) * pagePerGroup + 1);
    }
  };

  // 다음 그룹 이동
  const onGoNextGroup = () => {
    if (currentGroup < totalGroups) {
      setCurrentGroup(currentGroup + 1);
      setCurrentPage(currentGroup * pagePerGroup + 1);
    }
  };

  const onGoPrevPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      onPageChange(prevPage, 10); // 페이지 변경을 상위 컴포넌트로 알림
    }
  };

  const onGoNextPage = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      onPageChange(nextPage, 10); // 페이지 변경을 상위 컴포넌트로 알림
    }
  };

  return (
    <div>
      <ul>
        <li>
          <button onClick={onGoPrevPage}>&lt;</button>
        </li>
        {currentGroup > 1 && (
          <li>
            <button onClick={onGoPrevGroup}>&lt;&lt;</button>
          </li>
        )}
        {pageNumbers
          .slice((currentGroup - 1) * pagePerGroup, currentGroup * pagePerGroup)
          .map((pageNumber) => (
            <li key={pageNumber}>
              <button onClick={() => onPageChange(pageNumber, 10)}>
                {pageNumber}
              </button>
            </li>
          ))}
        <li>
          <button onClick={onGoNextPage}>&gt;</button>
        </li>
        {currentGroup < totalGroups && (
          <li>
            <button onClick={onGoNextGroup}>&gt;&gt;</button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Pagination;
