import styled from '@emotion/styled';
import { ItemData } from '..';
import { AiOutlinePicture } from 'react-icons/ai';
import { boxShadow, flexCenter } from 'styles/common';
import { useNavigate } from 'react-router-dom';

const Item = ({
  item,
  id,
  search,
  page,
}: {
  item: ItemData;
  id: number;
  search: string;
  page: number;
}) => {
  const navigate = useNavigate();
  const title =
    item.title.length > 15 ? `${item.title.slice(0, 20)}...` : item.title;

  const onShowBookDetail = () => {
    navigate(`/${search}/${page}/${id}`);
  };
  return (
    <S.Container onClick={onShowBookDetail}>
      {item.thumbnail ? (
        <img src={item.thumbnail} alt={item.title} />
      ) : (
        <S.NoImg>
          <S.NoImgBox>
            <AiOutlinePicture size={24} />
            <p>No Image</p>
          </S.NoImgBox>
        </S.NoImg>
      )}
      <S.Title>{title}</S.Title>
      <S.AuthorAndPublisher>
        {item.authors.length > 1 ? (
          <>
            {item.authors[0]} 외 | {item.publisher}
          </>
        ) : (
          <>
            {item.authors[0]} | {item.publisher}
          </>
        )}
      </S.AuthorAndPublisher>
      <S.Price>
        {item.price.toLocaleString()} <S.Won>원</S.Won>
      </S.Price>
    </S.Container>
  );
};

export default Item;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.border.primary};
  border-radius: 4px;
  padding: 20px;
  cursor: pointer;
  transition: transform 0.3s ease;

  :hover {
    transform: translateY(-5px);
    ${boxShadow}
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

const Title = styled.p`
  margin-top: 20px;
  line-height: 1.2;
  font-size: ${({ theme }) => theme.fontSize.small};
  font-weight: bold;
  color: ${({ theme }) => theme.color.black};
`;

const AuthorAndPublisher = styled.p`
  margin-top: 8px;
  font-size: 13px;
  color: #999;
`;

const Price = styled.p`
  font-size: ${({ theme }) => theme.fontSize.small};
  font-weight: bold;
  margin-top: 12px;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.color.black};
`;

const Won = styled.span`
  font-size: 12px;
  margin-left: 4px;
`;

const S = {
  Container,
  NoImg,
  NoImgBox,
  Title,
  AuthorAndPublisher,
  Price,
  Won,
};
