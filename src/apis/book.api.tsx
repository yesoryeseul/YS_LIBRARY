import { axiosInstance } from "./@core";

const PATH = `v3/search/book`;

const BookApi = {
  getBookList: async (query: string) =>
    await axiosInstance.get(PATH, {
      params: { query },
    }),
};

export default BookApi;
