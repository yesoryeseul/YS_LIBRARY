import styled from '@emotion/styled';

const Main = () => {
  return (
    <S.Wrapper>
      <div>책 썸네일 영역</div>
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
