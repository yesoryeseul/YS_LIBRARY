import BookApi from 'apis/book.api';
import { useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Item from './components/Item';
import { atom, useAtom } from 'jotai';
import styled from '@emotion/styled';
import Pagination from 'components/pagination/Pagination';
import { flexCenter, mq } from 'styles/common';
import Select from 'components/select/Select';

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
const totalCountAtom = atom(0);
const pageableCountAtom = atom(0);
const currentPageAtom = atom(1);

const SearchPage = () => {
  const { search } = useParams<{ search?: string }>();
  const [items, setItems] = useAtom(itemAtom);
  const [totalCount, setTotalCount] = useAtom(totalCountAtom);
  const [pageableCount, setPageableCount] = useAtom(pageableCountAtom);
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const [sizes, setSizes] = useAtom(size); // 페이지 당 보여줄 개수

  const navigate = useNavigate();
  const [searchParams, _] = useSearchParams();
  useEffect(() => {
    if (search) {
      // URL 파라미터에 따라 currentPage와 sizes를 업데이트
      const pageParam = searchParams.get('page');
      const sizeParam = searchParams.get('size');
      const currentPageValue = pageParam ? parseInt(pageParam, 10) : 1;
      const sizesValue = sizeParam ? parseInt(sizeParam, 10) : 10;
      setCurrentPage(currentPageValue);
      setSizes(sizesValue);

      const fetchData = async (page: number, size: number) => {
        try {
          const response = await BookApi.getBookList(search, page, size);
          console.log('data 테스트', response.data);
          console.log('api 테스트', response.data.documents);
          const newData: ItemData[] = response.data.documents;
          setItems(newData);

          const { total_count, pageable_count } = response.data.meta;
          setTotalCount(total_count);
          setPageableCount(pageable_count);
          console.log('개수', total_count, pageable_count);
        } catch (error) {
          console.error('데이터 불러오는 중 에러 발생', error);
        }
      };

      fetchData(currentPageValue, sizesValue);
    }
  }, [
    search,
    searchParams,
    setItems,
    setCurrentPage,
    setSizes,
    setTotalCount,
    setPageableCount,
  ]);

  const handlePageChange = (pageNumber: number, newSize: number) => {
    // 페이지 번호 변경 시 호출되는 함수
    setCurrentPage(pageNumber);
    setSizes(newSize);
    searchParams.set('page', pageNumber.toString());
    searchParams.set('size', newSize.toString());
    navigate(`?${searchParams.toString()}`);
  };

  const options = [
    { label: '10개씩 보기', value: 10 },
    { label: '30개씩 보기', value: 30 },
    { label: '50개씩 보기', value: 50 },
  ];

  const handleSelectChange = (value: number) => {
    // const newPageNumber = Math.ceil(((currentPage - 1) * sizes) / value);
    // setSizes(value);
    // setCurrentPage(newPageNumber); // 새로운 페이지 번호 설정
    // searchParams.set('page', newPageNumber.toString());
    // searchParams.set('size', value.toString());
    // navigate(`?${searchParams.toString()}`);
    setSizes(value);
    searchParams.set('size', value.toString());
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
      <S.SelectBox>
        <Select
          variant={'primary'}
          options={options}
          selectedValue={sizes}
          selectedLabel={'10개씩 보기'}
          onChange={handleSelectChange}
        />
      </S.SelectBox>
      <S.Container>
        {items.map((item, index) => (
          <Item
            key={index}
            item={item}
            id={index}
            search={search || ''}
            page={currentPage}
            size={sizes}
          />
        ))}
      </S.Container>
      <Pagination
        pageable_count={pageableCount}
        onPageChange={handlePageChange}
        sizes={sizes}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </S.Wrapper>
  );
};

export default SearchPage;

const Wrapper = styled.div`
  margin: 70px auto 100px;
  max-width: 1100px;
`;

const SelectBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 30px;

  ${mq[3]} {
    padding: 0 20px;
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 24px;

  ${mq[0]} {
    display: flex;
    flex-direction: column;
  }

  ${mq[2]} {
    grid-template-columns: repeat(2, 1fr);
  }
  ${mq[3]} {
    padding: 0 20px;
  }
`;

const NoContainer = styled.div`
  ${flexCenter}
  font-size: 24px;
  font-weight: bold;
  color: #777;
`;

const S = { Wrapper, SelectBox, Container, NoContainer };
