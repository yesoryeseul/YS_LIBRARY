export interface ItemData {
  authors: string[];
  contents: string;
  datetime: string;
  isbn: string;
  price: number;
  publisher: string;
  sale_price: number;
  status: string;
  thumbnail: string;
  title: string;
  translate: string[];
  url: string;
}

export interface ItemProps {
  item: ItemData;
  id: number;
  search: string;
  page: number;
  size: number;
}
