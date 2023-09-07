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
    </S.Container>
  );
};

export default Item;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  width: 120px;
  height: 174px;
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
`;

const S = { Container, NoImg, NoImgBox, Title };
