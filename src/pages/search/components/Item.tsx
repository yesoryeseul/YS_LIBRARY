import { ItemData } from '..';

const Item = ({ item }: { item: ItemData }) => {
  return (
    <div>
      <img src={item.thumbnail} alt={item.title} />
      <div>{item.title}</div>
    </div>
  );
};

export default Item;
