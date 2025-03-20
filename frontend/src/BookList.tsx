import { useEffect, useState } from 'react';
import { Book } from './types/Book';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BookList.css';

function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isSorted, setIsSorted] = useState<boolean>(false);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(
        `https://localhost:5269/api/Bookstore/GetAllBooks?pageSize=${pageSize}&pageNum=${pageNum}&isSorted=${isSorted}`
      );
      const data = await response.json();
      setBooks(data.books);
      setTotalItems(data.numBooks);
      setTotalPages(Math.ceil(data.numBooks / pageSize));
    };
    fetchBooks();
  }, [pageSize, pageNum, isSorted]);

  return (
    <>
      <div className="container mt-4">
        {/*Header/Title*/}
        <h1 className="text-center mb-4">The Online Bookstore</h1>

        {/*Extra fun thing to show how many "results" showed up*/}
        <h4 className="text-muted h6">
          {totalItems} books available for purchase
        </h4>
        <br />

        {/* Book cards to list out all books dynamically*/}
        <div className="book-cards-container d-flex flex-wrap gap-4">
          {books.map((book) => (
            <div key={book.bookId} className="card shadow-sm book-card">
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <ul className="list-unstyled">
                  <li>
                    <strong>Author:</strong> {book.author}
                  </li>
                  <li>
                    <strong>Publisher:</strong> {book.publisher}
                  </li>
                  <li>
                    <strong>ISBN:</strong> {book.isbn}
                  </li>
                  <li>
                    <strong>Classification:</strong> {book.classification}
                  </li>
                  <li>
                    <strong>Category:</strong> {book.category}
                  </li>
                  <li>
                    <strong>Page Count:</strong> {book.pageCount} pages
                  </li>
                  <li>
                    <strong>Price:</strong> ${book.price}
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>

        <br />

        <div className="d-flex justify-content-center align-items-center my-3">
          {/* Checkbox to allow the user to decide if they want to sort the books alphabetically */}
          <label className="form-check-label" htmlFor="sortCheckbox">
            Sort by Title&nbsp;&nbsp;
          </label>
          <input
            type="checkbox"
            className="form-check-input me-2"
            id="sortCheckbox"
            checked={isSorted}
            onChange={() => {
              setIsSorted(!isSorted);
              setPageNum(1);
            }}
          />

          {/* Dropdown to allow the user to select how many results they want to see per page */}
          <label className="me-2">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Results per page:
          </label>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPageNum(1);
            }}
            className="form-select w-auto d-inline-block"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>

        {/* Buttons to allow the user to move between pages */}
        <div className="d-flex justify-content-center align-items-center mt-4">
          {/* Button to move to previous page */}
          <button
            className="btn btn-primary me-2"
            disabled={pageNum === 1}
            onClick={() => setPageNum(pageNum - 1)}
          >
            Previous
          </button>

          {/* Buttons to move to other pages, greys out current page */}
          <div className="btn-group">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                className={`btn ${pageNum === index + 1 ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setPageNum(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {/* Button to move to next page */}
          <button
            className="btn btn-primary ms-2"
            disabled={pageNum === totalPages}
            onClick={() => setPageNum(pageNum + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default BookList;
