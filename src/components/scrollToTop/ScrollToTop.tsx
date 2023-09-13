import styled from '@emotion/styled';

const ScrollToTop: React.FC = () => {
  const handleTopBtn = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <S.Container onClick={handleTopBtn}>
      <S.TopBtn>Top</S.TopBtn>
    </S.Container>
  );
};

export default ScrollToTop;

const Container = styled.div`
  position: fixed;
  right: 5%;
  bottom: 5%;
  z-index: 1;
`;

const TopBtn = styled.button`
  font-weight: bold;
  font-size: 15px;
  padding: 15px 10px;
  background-color: ${({ theme }) => theme.color.primary};
  color: #fff;
  border-radius: 50%;
  cursor: pointer;
`;

const S = {
  Container,
  TopBtn,
};
