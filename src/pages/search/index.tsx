import BookApi from 'apis/book.api';
import { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Item from './components/Item';
import { atom, useAtom } from 'jotai';
import styled from '@emotion/styled';
import Pagination from 'components/pagination/Pagination';
import { flexCenter } from 'styles/common';

export interface ItemData {
  authors: string[];
  contents: string;
  datetime: string;
  isbn: string;
  price: number;
  publisher: string;
  sale_price: number;
  status: string;
  thumbnail: string;
  title: string;
  translate: string[];
  url: string;
}

export const bookAtom = atom<ItemData | null>(null);
const itemAtom = atom<ItemData[]>([]);
const size = atom(10);

const SearchPage = () => {
  const { search } = useParams<{ search?: string }>();
  const [items, setItems] = useAtom(itemAtom);
  const [totalCount, setTotalCount] = useState(0);
  const [pageableCount, setPageableCount] = useState(0);
  // const [isEnd, setIsEnd] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sizes, setSizes] = useAtom(size); // 페이지 당 보여줄 개수

  const navigate = useNavigate();
  const [searchParams, _] = useSearchParams();

  useEffect(() => {
    if (search) {
      const fetchData = async (page: number, size: number) => {
        try {
          const response = await BookApi.getBookList(search, page, size);
          console.log('data 테스트', response.data);
          console.log('api 테스트', response.data.documents);
          const newData: ItemData[] = response.data.documents;
          setItems(newData);

          const { total_count, pageable_count, is_end } = response.data.meta;
          setTotalCount(total_count);
          setPageableCount(pageable_count);
          // setIsEnd(is_end);
          console.log('개수', total_count, pageable_count);
        } catch (error) {
          console.error('데이터 불러오는 중 에러 발생', error);
        }
      };

      // URL 파라미터에 따라 currentPage와 sizes를 업데이트
      const pageParam = searchParams.get('page');
      const sizeParam = searchParams.get('size');
      if (pageParam) {
        setCurrentPage(pageParam ? parseInt(pageParam, 10) : 1);
      }
      if (sizeParam) {
        setSizes(sizeParam ? parseInt(sizeParam, 10) : 10);
      }

      fetchData(currentPage, sizes);
    }
  }, [search, setItems, currentPage, sizes, searchParams, setSizes]);

  const handlePageChange = (pageNumber: number, newSize: number) => {
    // 페이지 번호 변경 시 호출되는 함수
    setCurrentPage(pageNumber);
    searchParams.set('page', pageNumber.toString());
    searchParams.set('size', newSize.toString());
    navigate(`?${searchParams.toString()}`);
  };

  if (items.length === 0) {
    return (
      <S.Wrapper>
        <S.NoContainer>검색 결과가 없습니다</S.NoContainer>
      </S.Wrapper>
    );
  }

  return (
    <S.Wrapper>
      <S.Container>
        {items.map((item, index) => (
          <Item
            key={index}
            item={item}
            id={index}
            search={search || ''}
            page={currentPage}
          />
        ))}
      </S.Container>
      <Pagination
        total_count={totalCount}
        pageable_count={pageableCount}
        onPageChange={handlePageChange}
        sizes={sizes}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        // is_end={isEnd}
      />
    </S.Wrapper>
  );
};

export default SearchPage;

const Wrapper = styled.div`
  margin: 70px auto 100px;
  max-width: 1100px;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 24px;
`;

const NoContainer = styled.div`
  ${flexCenter}
  font-size: 24px;
  font-weight: bold;
  color: #777;
`;

const S = { Wrapper, Container, NoContainer };
