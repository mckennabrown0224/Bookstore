import { useEffect, useState } from "react";
import {Book} from "./types/Book"

function BookList() {
    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(10);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(1);

    useEffect(() => {
        const fetchBooks = async () => {
          const response = await fetch(
            `https://localhost:5269/api/Bookstore/GetAllBooks?pageSize=${pageSize}&PageNum=${pageNum}`
          );
          const data = await response.json();
          setBooks(data.books);
          setTotalItems(data.numBooks);
          setTotalPages(Math.ceil(totalItems / pageSize));
        };
        fetchBooks();
      }, [pageSize, pageNum, totalItems]);

    return (
        <>
        <h1 className="title">Bookstore Books</h1>
        <br />
        {books.map((b) => (
          <div id="projectCard" className="card" key={b.bookId}>
            <h3 className="card-title">{b.title}</h3>
            <div className="card-body">
              <ul className="list-unstyled">
                <li>
                  <strong>Author:</strong> {b.author}
                </li>
                <li>
                  <strong> Publisher: </strong>
                  {b.publisher}
                </li>
                <li>
                  <strong>ISBN: </strong> {b.iSBN}
                </li>
                <li>
                  <strong>Classification: </strong>
                  {b.classification}
                </li>
                <li>
                  <strong>Category: </strong>
                  {b.category}
                </li>
                <li>
                  <strong>Page Count: </strong>
                  {b.pageCount} pages
                </li>
                <li>
                  <strong>Price: </strong>
                  ${b.price}
                </li>
              </ul>
            </div>
          </div>
        ))}
  
        <br />
        <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>
          Previous
        </button>
  
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            onClick={() => setPageNum(i + 1)}
            disabled={pageNum === i + 1}
          >
            {i + 1}
          </button>
        ))}
  
        <button
          disabled={pageNum === totalPages}
          onClick={() => setPageNum(pageNum + 1)}
        >
          Next
        </button>
  
        <br />
        <label>
          Results per page:
          <select
            value={pageSize}
            onChange={(p) => {
              setPageSize(Number(p.target.value));
              setPageNum(1);
            }}
            className="select"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </label>
      </>
    )
}

export default BookList;
