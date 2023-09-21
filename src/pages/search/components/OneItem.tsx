import styled from '@emotion/styled';
import { AiOutlinePicture } from 'react-icons/ai';
import { boxShadow, flexCenter, mq } from 'styles/common';
import { useNavigate } from 'react-router-dom';
import { ItemProps } from 'types/Item.interface';

const OneItem = ({ item, id, search, page, size }: ItemProps) => {
  const navigate = useNavigate();
  const title =
    item.title.length > 15 ? `${item.title.slice(0, 20)}...` : item.title;

  const onShowBookDetail = () => {
    navigate(`/${search}/${page}/${id}`, { state: { size } });
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
      <S.DescBox>
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
      </S.DescBox>
    </S.Container>
  );
};

export default OneItem;

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

  ${mq[1]} {
    transition: none;

    :hover {
      transform: none;
      box-shadow: none;
    }
  }

  ${mq[2]} {
    flex-direction: row;
  }
`;

const NoImg = styled.div`
  height: 230px;
  background-color: #d9d9d9;
  ${flexCenter}
  align-items: center;
  ${mq[3]} {
    height: 210px;
  }
  ${mq[2]} {
    width: 120px;
    height: 174px;
  }
`;

const NoImgBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DescBox = styled.div`
  ${mq[2]} {
    display: flex;
    flex-direction: column;
    margin-left: 20px;
  }
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
  DescBox,
  Title,
  AuthorAndPublisher,
  Price,
  Won,
};
