import styled from '@emotion/styled';
import { flexCenter } from 'styles/common';

const Header = () => {
  return (
    <S.Container>
      <S.Title>YS Library</S.Title>
      <S.SubTitle>당신이 원하는 도서를 무엇이든 검색해보세요</S.SubTitle>
      <S.SearchBarContainer>
        <form>
          <S.SearchBar />
        </form>
      </S.SearchBarContainer>
    </S.Container>
  );
};

export default Header;

const Container = styled.div`
  width: 100%;
  ${flexCenter}
  flex-direction: column;
  align-items: center;
`;
const Title = styled.h1`
  color: ${({ theme }) => theme.color.primary};
  font-size: ${({ theme }) => theme.fontSize.title};
  margin-top: 120px;
`;
const SubTitle = styled.p`
  color: ${({ theme }) => theme.color.gray500};
  font-size: ${({ theme }) => theme.fontSize.subtitle};
  margin-top: 40px;
`;

const SearchBarContainer = styled.div`
  max-width: 850px;
`;

const SearchBar = styled.input`
  border-bottom: 1px solid #555;
`;

export const S = {
  Container,
  Title,
  SubTitle,
  SearchBarContainer,
  SearchBar,
};
