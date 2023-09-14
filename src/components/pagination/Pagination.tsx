import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useSearchParams } from 'react-router-dom';
import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi';
import {
  TbPlayerTrackPrevFilled,
  TbPlayerTrackNextFilled,
} from 'react-icons/tb';
import { flexCenter, mq } from 'styles/common';
import { atom, useAtom } from 'jotai';
import { PageProps } from 'interfaces/Pagination.interface';

const groupAtom = atom(1);

const Pagination: React.FC<PageProps> = ({
  pageable_count,
  onPageChange,
  sizes,
  currentPage,
  setCurrentPage,
}) => {
  const totalPages = Math.ceil(pageable_count / sizes); // 총 페이지 개수
  const [currentGroup, setCurrentGroup] = useAtom(groupAtom);
  const [params, _] = useSearchParams();
  const currentPageNumber = Number(params.get('page')) || currentPage;

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
      const prevGroupLastPage =
        (currentGroup - 2) * pagePerGroup + pagePerGroup;
      setCurrentPage(prevGroupLastPage);
      onPageChange(prevGroupLastPage, sizes);
    }
  };

  // 다음 그룹 이동
  const onGoNextGroup = () => {
    if (currentGroup < totalGroups) {
      setCurrentGroup(currentGroup + 1);
      const nextGroupFirstPage = currentGroup * pagePerGroup + 1;
      setCurrentPage(nextGroupFirstPage);
      onPageChange(nextGroupFirstPage, sizes);
    }
  };

  // 이전 페이지 이동
  const onGoPrevPage = () => {
    if (currentPageNumber > 1) {
      const prevPage = currentPageNumber - 1;
      setCurrentPage(prevPage);
      onPageChange(prevPage, sizes); // 페이지 url 변경
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
      onPageChange(nextPage, sizes); // 페이지 변경을 상위 컴포넌트로 알림
      if (nextPage > currentGroup * pagePerGroup)
        // 다음 페이지가 현재 그룹의 마지막 페이지를 넘어갈 때 다음 그룹으로 이동(11, 21, 31, ... 이 될 때)
        onGoNextGroup();
    }
  };

  return (
    <div>
      <S.UlContainer>
        {currentGroup > 1 && (
          <S.PrevGroup onClick={onGoPrevGroup}>
            <TbPlayerTrackPrevFilled size={16} />
          </S.PrevGroup>
        )}
        <S.PrevNextList onClick={onGoPrevPage}>
          <BiSolidLeftArrow size={12} />
        </S.PrevNextList>
        {pageNumbers
          .slice((currentGroup - 1) * pagePerGroup, currentGroup * pagePerGroup)
          .map((pageNumber) => (
            <li key={pageNumber}>
              <S.PageBtn
                isActive={pageNumber === currentPageNumber}
                onClick={() => onPageChange(pageNumber, sizes)}
              >
                {pageNumber}
              </S.PageBtn>
            </li>
          ))}
        <S.PrevNextList onClick={onGoNextPage}>
          <BiSolidRightArrow size={12} />
        </S.PrevNextList>
        {currentGroup < totalGroups && (
          <S.NextGroup onClick={onGoNextGroup}>
            <TbPlayerTrackNextFilled size={15} />
          </S.NextGroup>
        )}
      </S.UlContainer>
    </div>
  );
};

export default Pagination;

const UlContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 70px;
  ${mq[0]} {
    padding: 0 16px;
  }
`;

const LiContainer = styled.li`
  button:last-of-type {
    margin-right: 0;
  }
`;

const PrevNextList = styled.li`
  background-color: ${({ theme }) => theme.color.primary};
  width: 32px;
  height: 32px;
  ${flexCenter}
  align-items: center;
  cursor: pointer;
  svg {
    path {
      fill: #fff;
    }
  }
`;

const PrevGroup = styled.li`
  background-color: ${({ theme }) => theme.color.primary};
  width: 32px;
  height: 32px;
  ${flexCenter}
  align-items: center;
  cursor: pointer;
  svg {
    color: #fff;
  }
`;

const NextGroup = styled.li`
  background-color: ${({ theme }) => theme.color.primary};
  width: 32px;
  height: 32px;
  ${flexCenter}
  align-items: center;
  cursor: pointer;
  svg {
    color: #fff;
  }
`;

const PageBtn = styled.button<{ isActive?: boolean }>`
  border: none;
  background-color: ${({ theme }) => theme.color.primary};
  width: 32px;
  height: 32px;
  color: #fff;
  font-weight: bold;
  ${({ isActive }) =>
    isActive &&
    css`
      background-color: #6aa3ff;
    `}
`;

const S = {
  UlContainer,
  LiContainer,
  PrevNextList,
  PrevGroup,
  NextGroup,
  PageBtn,
};
