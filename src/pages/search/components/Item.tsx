import styled from '@emotion/styled';
import { ItemData } from '..';
import { AiOutlinePicture } from 'react-icons/ai';
import { flexCenter } from 'styles/common';

const Item = ({ item }: { item: ItemData }) => {
  const title =
    item.title.length > 15 ? `${item.title.slice(0, 20)}...` : item.title;
  return (
    <S.Container>
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
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  padding: 20px;
  transition: transform 0.3s ease;

  :hover {
    transform: translateY(-5px);
    box-shadow: 0px 0px 15px -3px rgba(0, 0, 0, 0.05);
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
