import BookApi from '@/apis/book.api';
import { useEffect } from "react";

const Testing = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await BookApi.getBookList("프론트엔드");
        console.log("api 테스트", response.data.documents);
      } catch (error) {
        console.error("데이터 불러오는 중 에러 발생", error);
      }
    };
    fetchData();
  }, []);
  return null;
};

export default Testing;
