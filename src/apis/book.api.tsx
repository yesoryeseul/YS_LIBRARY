import { axiosInstance } from './@core';

const PATH = `v3/search/book`;

const BookApi = {
  getBookList: async (query: string, page: number) =>
    await axiosInstance.get(PATH, {
      params: { query, page },
    }),
};

export default BookApi;
