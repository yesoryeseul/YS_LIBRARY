import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import BookApi from 'apis/book.api';
import { useAtom } from 'jotai';
import { itemAtom } from 'pages/search';
import { useEffect } from 'react';

const Main = () => {
  const [items, setItems] = useAtom(itemAtom);
  useEffect(() => {
    const fetchData = async (keyword: string) => {
      try {
        const response = await BookApi.getBookList(keyword, 1, 50);
        console.log('test', response.data.documents);
        setItems(response.data.documents);
      } catch (error) {
        console.error('데이터 패칭 에러 발생', error);
      }
    };
    fetchData('프로그래밍');
  }, [setItems]);

  return (
    <S.Wrapper>
      <S.BannerTop>
        <S.BannerBox>
          {items.slice(0, 25).map((item, i) => (
            <S.SlideRight src={item.thumbnail} key={i} alt={item.title} />
          ))}
        </S.BannerBox>
      </S.BannerTop>
      <S.BannerBottom>
        <S.BannerBox>
          {items.slice(25, 50).map((item, i) => (
            <S.SlideLeft src={item.thumbnail} key={i} alt={item.title} />
          ))}
        </S.BannerBox>
      </S.BannerBottom>
    </S.Wrapper>
  );
};

export default Main;

const Wrapper = styled.div`
  max-width: 1400px;
  margin: 70px auto;
`;

const BannerTop = styled.div`
  padding: 0 20px;
`;
const BannerBox = styled.div`
  padding: 0 20px;
  width: 100%;
  overflow: hidden;
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

const slideRight = keyframes`
  from {
    transform: translateX(-100%);

  }
  to {
    transform: translateX(0);
  }
`;

const SlideRight = styled.img`
  animation: ${slideRight} 20s linear infinite;
  max-width: 100%;
`;

const BannerBottom = styled.div`
  width: 100%;
  overflow: hidden;
  display: flex;
  gap: 20px;
`;

const slideLeft = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;

const SlideLeft = styled.img`
  animation: ${slideLeft} 20s linear infinite;
  max-width: 100%;
`;

export const S = {
  Wrapper,
  BannerTop,
  SlideRight,
  BannerBottom,
  SlideLeft,
  BannerBox,
};
