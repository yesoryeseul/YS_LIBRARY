import styled from '@emotion/styled';
import { flexCenter } from 'styles/common';

const Main = () => {
  return (
    <S.Wrapper>
      <S.Container>
        <S.Title>YS Library</S.Title>
      </S.Container>
    </S.Wrapper>
  );
};

export default Main;

const Wrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;
const Container = styled.div`
  width: 100%;
  ${flexCenter}
`;
const Title = styled.h1`
  color: ${({ theme }) => theme.color.primary};
`;

export const S = {
  Wrapper,
  Container,
  Title,
};
