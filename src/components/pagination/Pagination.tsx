import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

interface PageProps {
  total_count: number;
  pageable_count: number;
  // is_end: boolean;
  onPageChange: (pageNumber: number, newSize: number) => void;
  sizes: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<PageProps> = ({
  total_count,
  pageable_count,
  onPageChange,
  sizes,
  currentPage,
  setCurrentPage,
}) => {
  const totalPages = Math.ceil(pageable_count / sizes); // 총 페이지 개수
  const [currentGroup, setCurrentGroup] = useState(1);
  const [params, _] = useSearchParams();
  const currentPageNumber = Number(params.get('page')) || currentPage;

  console.log('page', currentPageNumber, typeof currentPageNumber);

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

  // 이전 페이지 이동
  const onGoPrevPage = () => {
    if (currentPageNumber > 1) {
      const prevPage = currentPageNumber - 1;
      setCurrentPage(prevPage);
      onPageChange(prevPage, 10); // 페이지 url 변경
      // 10, 20, 30, 40 페이지가 되었을 때 이전 그룹으로 이동하는 로직
      if (prevPage < (currentGroup - 1) * pagePerGroup + 1) onGoPrevGroup();
      // 10 < 11, 20 < 21, 30 < 31, 의 조건일 때만 이동
    }
  };

  // 다음 페이지 이동
  const onGoNextPage = () => {
    if (currentPageNumber < totalPages) {
      const nextPage = currentPageNumber + 1;
      setCurrentPage(nextPage);
      onPageChange(nextPage, 10); // 페이지 변경을 상위 컴포넌트로 알림
      if (nextPage > currentGroup * pagePerGroup)
        // 다음 페이지가 현재 그룹의 마지막 페이지를 넘어갈 때 다음 그룹으로 이동(11, 21, 31, ... 이 될 때)
        onGoNextGroup();
    }
  };

  return (
    <div>
      <S.UlContainer>
        <li>
          <S.PageBtn onClick={onGoPrevPage}>&lt;</S.PageBtn>
        </li>
        {currentGroup > 1 && (
          <li>
            <S.PageBtn onClick={onGoPrevGroup}>&lt;&lt;</S.PageBtn>
          </li>
        )}
        {pageNumbers
          .slice((currentGroup - 1) * pagePerGroup, currentGroup * pagePerGroup)
          .map((pageNumber) => (
            <li key={pageNumber}>
              <S.PageBtn
                isActive={pageNumber === currentPageNumber}
                onClick={() => onPageChange(pageNumber, 10)}
              >
                {pageNumber}
              </S.PageBtn>
            </li>
          ))}
        <li>
          <S.PageBtn onClick={onGoNextPage}>&gt;</S.PageBtn>
        </li>
        {currentGroup < totalGroups && (
          <S.LiContainer>
            <S.PageBtn onClick={onGoNextGroup}>&gt;&gt;</S.PageBtn>
          </S.LiContainer>
        )}
      </S.UlContainer>
    </div>
  );
};

export default Pagination;

const UlContainer = styled.ul`
  display: flex;
  justify-content: center;
  margin-top: 70px;
`;

const LiContainer = styled.li`
  button:last-of-type {
    margin-right: 0;
  }
`;

const PageBtn = styled.button<{ isActive?: boolean }>`
  border: none;
  background-color: ${({ theme }) => theme.color.primary};
  width: 32px;
  height: 32px;
  color: #fff;
  font-weight: bold;
  margin-right: 12px;
  ${({ isActive }) =>
    isActive &&
    css`
      background-color: #6aa3ff;
    `}
`;

const S = {
  UlContainer,
  LiContainer,
  PageBtn,
};
