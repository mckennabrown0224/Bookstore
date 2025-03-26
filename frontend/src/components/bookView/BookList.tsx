import { useBooks } from "../../context/BookContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../style/BookList.css";
import BookCard from "./BookCard";

const BookList = () => {
  const { books } = useBooks();

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
