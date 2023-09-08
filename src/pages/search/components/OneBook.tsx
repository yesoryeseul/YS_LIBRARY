import { atom, useAtom } from 'jotai';
import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import BookApi from 'apis/book.api';
import { ItemData, bookAtom } from '..';
import styled from '@emotion/styled';
import formatDate from 'utils/getDate';
import { boxShadow, flexCenter } from 'styles/common';
import { AiOutlinePicture } from 'react-icons/ai';

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
  const dateSplit = book?.datetime.split('T')[0];
  const date = dateSplit ? formatDate(dateSplit) : 'undefined';

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
          setBook(book);
        }
      };

      fetchData();
    }
  }, [id, search, setBook, sizes, searchParams, page, pageParam]);

  return (
    <S.Wrapper>
      {book ? (
        <S.Container>
          <S.Thumbnail>
            {book.thumbnail ? (
              <img src={book.thumbnail} alt={book.contents} />
            ) : (
              <S.NoImg>
                <S.NoImgBox>
                  <AiOutlinePicture size={24} />
                  <p>No Image</p>
                </S.NoImgBox>
              </S.NoImg>
            )}
          </S.Thumbnail>
          <S.Desc>
            <S.Title>{book.title}</S.Title>
            <S.Sub>
              {book.authors[0]} | {book.publisher} | {date}
            </S.Sub>
            <S.Hr />
            <S.PriceContainer>
              <S.PriceTitle>정가</S.PriceTitle>
              <p>{book.price.toLocaleString()} 원 </p>
            </S.PriceContainer>
            <S.PriceContainer>
              <S.PriceTitle>판매가</S.PriceTitle>
              <S.SalePrice>
                {book.sale_price === -1 ? (
                  <>{book.price.toLocaleString()}</>
                ) : (
                  <>{book.sale_price.toLocaleString()}</>
                )}
                <S.Won> 원</S.Won>
              </S.SalePrice>
            </S.PriceContainer>
            <S.Hr />
            <S.DetailDescTitle>상세설명</S.DetailDescTitle>
            <S.DetailDesc>{book.contents}</S.DetailDesc>
          </S.Desc>
        </S.Container>
      ) : (
        <>책을 찾을 수 없습니다</>
      )}
    </S.Wrapper>
  );
};

export default OneBook;

const Wrapper = styled.div`
  max-width: 840px;
  margin: 70px auto 100px;
`;

const Container = styled.div`
  width: 100%;
  padding: 30px;
  display: flex;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.border.primary};
  border-radius: 8px;
  transition: transform 0.3s ease;

  :hover {
    transform: translateY(-5px);
    ${boxShadow}
  }
`;

const Thumbnail = styled.div`
  margin-right: 30px;
  img {
    width: 160px;
  }
`;

const NoImg = styled.div`
  width: 160px;
  height: 230px;
  background-color: #d9d9d9;
  ${flexCenter}
  align-items: center;
`;

const NoImgBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Desc = styled.div`
  width: 100%;
`;

const Title = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

const Sub = styled.div`
  font-size: 12px;
  color: #666;
  margin-top: 16px;
`;

const Hr = styled.div`
  margin: 30px 0;
  width: 100%;
  height: 1px;
  background-color: #d8d8d8;
`;

const DetailDescTitle = styled.p`
  font-size: 12px;
  font-weight: bold;
  color: ${({ theme }) => theme.color.black};
  margin-bottom: 12px;
`;

const DetailDesc = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.color.gray500};
  line-height: 1.4;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #666;
  font-weight: bold;
  margin-bottom: 12px;
`;
const PriceTitle = styled.p`
  width: 50px;
`;

const SalePrice = styled.p`
  color: #ff6666;
  font-size: 24px;
`;

const Won = styled.span`
  font-size: 13px;
`;

const S = {
  Wrapper,
  Container,
  Thumbnail,
  NoImg,
  NoImgBox,
  Desc,
  Title,
  Sub,
  Hr,
  DetailDescTitle,
  DetailDesc,
  PriceContainer,
  PriceTitle,
  SalePrice,
  Won,
};
