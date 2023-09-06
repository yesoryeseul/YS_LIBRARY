import { axiosInstance } from './@core';

const PATH = `v3/search/book`;

const BookApi = {
  getBookList: async (query: string, page: number, size: number) =>
    await axiosInstance.get(PATH, {
      params: { query, page, size },
    }),

  // total_count / size = 페이지 개수
};

export default BookApi;
