import "bootstrap/dist/css/bootstrap.min.css";
import "../../style/BookList.css";
import BookCard from "./BookCard";
import { Book } from "../../types/Book";

interface BookListProps {
  books: Book[];
}

const BookList = ({ books }: BookListProps) => {
  return (
    <div className="container">
      <div className="row book-cards-container">
        {books.map((book) => (
          <div key={book.bookId} className="col-md-6">
            <BookCard book={book} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
