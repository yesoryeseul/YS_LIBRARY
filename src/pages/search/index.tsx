import BookApi from 'apis/book.api';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Item from './components/Item';
import { atom, useAtom } from 'jotai';

export interface ItemData {
  Authore: [];
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
          const response = await BookApi.getBookList(search);
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
    <div>
      {items.map((item, index) => (
        <Item key={index} item={item} />
      ))}
    </div>
  );
};

export default SearchPage;
