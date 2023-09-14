export interface PageProps {
  pageable_count: number;
  onPageChange: (pageNumber: number, newSize: number) => void;
  sizes: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}
