import BookApi from 'apis/book.api';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Item from './components/Item';
import { atom, useAtom } from 'jotai';
import styled from '@emotion/styled';
import Pagination from 'components/pagination/Pagination';

export interface ItemData {
  authors: [];
  contents: string;
  datetime: Date;
  isbn: string;
  price: number;
  publisher: string;
  sale_price: number;
  statue: string;
  thumbnail: string;
  title: string;
  translate: [];
  url: string;
}

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

  useEffect(() => {
    if (search) {
      const fetchData = async (page: number) => {
        try {
          const response = await BookApi.getBookList(search, page, sizes);
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
      fetchData(currentPage);
    }
  }, [search, setItems, currentPage, sizes]);

  const handlePageChange = (pageNumber: number) => {
    // 페이지 번호 변경 시 호출되는 함수
    setCurrentPage(pageNumber);
  };
  return (
    <S.Wrapper>
      <S.Container>
        {items.map((item, index) => (
          <Item key={index} item={item} />
        ))}
      </S.Container>
      <Pagination
        total_count={totalCount}
        pageable_count={pageableCount}
        onPageChange={handlePageChange}
        sizes={sizes}
        // is_end={isEnd}
      />
    </S.Wrapper>
  );
};

export default SearchPage;

const Wrapper = styled.div`
  margin: 70px auto 50px;
  max-width: 1100px;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 24px;
`;

const S = { Wrapper, Container };
