import { atom, useAtom } from 'jotai';
import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import BookApi from 'apis/book.api';
import { ItemData, bookAtom } from '..';

const size = atom(10);

const OneBook = () => {
  const { id, page, search } = useParams<{
    id?: string;
    page?: string;
    search?: string;
  }>();

  const [book, setBook] = useAtom(bookAtom);
  const [sizes, setSizes] = useAtom(size);

  const [searchParams, _] = useSearchParams();
  const pageParam = parseInt(page || '1', 10);

  useEffect(() => {
    if (search && id) {
      const fetchData = async () => {
        const response = await BookApi.getBookList(search, pageParam, sizes); // 책 데이터를 가져오는 함수
        const idData = response.data.documents;
        console.log('idData', idData);

        const book = idData.find(
          (_: ItemData, idx: number) => idx === parseInt(id)
        ); // id에 해당하는 책 데이터를 가져옴
        console.log('book', book);
        if (book) {
          setBook(book); // 해당 책의 title을 설정
        }
      };

      fetchData();
    }
  }, [id, search, setBook, sizes, searchParams, page, pageParam]);

  return (
    <>
      {book ? (
        <div>
          <img src={book.thumbnail} alt={book.contents} />
          <p>{book.title}</p>
        </div>
      ) : (
        <>책을 찾을 수 없습니다</>
      )}
    </>
  );
};

export default OneBook;
