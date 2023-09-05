import BookApi from 'apis/book.api';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Item from './components/Item';
import { atom, useAtom } from 'jotai';
import styled from '@emotion/styled';

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

const SearchPage = () => {
  const { search } = useParams<{ search?: string }>();
  const [items, setItems] = useAtom(itemAtom);

  useEffect(() => {
    if (search) {
      const fetchData = async () => {
        try {
          const response = await BookApi.getBookList(search, 1);
          console.log('data 테스트', response.data);
          console.log('api 테스트', response.data.documents);
          const newData: ItemData[] = response.data.documents;
          setItems(newData);
        } catch (error) {
          console.error('데이터 불러오는 중 에러 발생', error);
        }
      };
      fetchData();
    }
  }, [search, setItems]);
  return (
    <S.Wrapper>
      <S.Container>
        {items.map((item, index) => (
          <Item key={index} item={item} />
        ))}
      </S.Container>
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
