import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_KAKAO_BOOK_REST_API,
  headers: {
    Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_API_KEY}`,
  },
});
