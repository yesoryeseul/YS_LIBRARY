import styled from '@emotion/styled';
import Layout from 'components/Layout';

const Main = () => {
  return (
    <S.Wrapper>
      <Layout />
    </S.Wrapper>
  );
};

export default Main;

const Wrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

export const S = {
  Wrapper,
};
