import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Book } from "../types/Book";

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
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const BookProvider = ({ children }: { children: ReactNode }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [isSorted, setIsSorted] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchBooks = async () => {
      const categoryParams = selectedCategories
        .map((cat) => `bookTypes=${encodeURIComponent(cat)}`)
        .join("&");
      const apiURL = `https://localhost:5269/api/Bookstore/GetAllBooks?pageSize=${pageSize}&pageNum=${pageNum}&isSorted=${isSorted}${
        selectedCategories.length ? `&${categoryParams}` : ""
      }`;

      try {
        const response = await fetch(apiURL, { credentials: "include" });
        if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
        const data = await response.json();
        setBooks(data.books);
        setTotalPages(Math.max(Math.ceil(data.numBooks / pageSize), 1));
      } catch (error) {
        console.error("Error fetching books: ", error);
      }
    };

    fetchBooks();
  }, [pageSize, pageNum, isSorted, selectedCategories]);

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
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error("useBooks must be used within a BookProvider");
  }
  return context;
};
