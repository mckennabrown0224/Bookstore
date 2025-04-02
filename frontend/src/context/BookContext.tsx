import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Book } from '../types/Book';
import { fetchBooks } from '../api/BooksAPI';

interface BookContextType {
  books: Book[];
  selectedCategories: string[];
  pageSize: number;
  pageNum: number;
  isSorted: boolean;
  totalPages: number;
  setSelectedCategories: (categories: string[]) => void;
  setPageSize: (size: number) => void;
  setPageNum: (num: number) => void;
  setIsSorted: (sorted: boolean) => void;
  setBooks: (books: Book[]) => void;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const BookProvider = ({ children }: { children: ReactNode }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [isSorted, setIsSorted] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks(
          pageSize,
          pageNum,
          selectedCategories,
          isSorted
        );

        setBooks(data.books);
        setTotalPages(Math.max(Math.ceil(data.numBooks / pageSize), 1));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [pageSize, pageNum, isSorted, selectedCategories]);

  if (loading) return <p>Loading Books...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <BookContext.Provider
      value={{
        books,
        selectedCategories,
        pageSize,
        pageNum,
        isSorted,
        totalPages,
        setSelectedCategories,
        setPageSize,
        setPageNum,
        setIsSorted,
        setBooks,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
};

