import styled from '@emotion/styled';
import { flexCenter } from 'styles/common';
import Input from './input/input';
import { atom, useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';

const inputAtom = atom<string>('');

const Header = () => {
  const [inputValue, setInputValue] = useAtom(inputAtom);
  const navigate = useNavigate();

  const onSearchBook = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('검색어:', inputValue);
    navigate(`/${inputValue}`);
  };

  const onChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <S.Container>
      <S.Title>YS Library</S.Title>
      <S.SubTitle>당신이 원하는 도서를 무엇이든 검색해보세요</S.SubTitle>
      <S.SearchBarContainer>
        <form onSubmit={onSearchBook}>
          <Input
            placeholder={'도서명, 저자, 출판사를 검색해보세요'}
            variant={'lineType'}
            shape={'none'}
            leng={'pc'}
            onChange={onChangeKeyword}
          />
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
  margin: 40px 0;
`;

const SearchBarContainer = styled.div`
  form > input {
    padding: 0 0 12px 16px;
  }
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
