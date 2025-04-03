import { useState } from 'react';
import { useBooks } from '../../context/BookContext';
import { Book } from '../../types/Book';
import NewBookForm from './NewBookForm';
import { deleteBook, fetchBooks } from '../../api/BooksAPI';
import UpdateBookForm from './UpdateBookForm'; // Ensure this path is correct

const AdminBookView = () => {
  const { books, pageNum, pageSize, isSorted, setBooks } = useBooks();
  const [showForm, setShowForm] = useState(false);
  const [updatingBook, setUpdatingBook] = useState<Book | null>(null);

  const handleDelete = async (bookId: number) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this book?'
    );
    if (!confirmDelete) return;

    try {
      await deleteBook(bookId);
      setBooks(books.filter((b) => b.bookId !== bookId));
    } catch (error) {
      alert('Failed to delete book. Please try again.');
    }
  };

  if (!books.length) return <p>No books found.</p>;

  return (
    <div>
      {!showForm && (
        <button
          className="btn btn-success mb-3"
          onClick={() => setShowForm(true)}
        >
          {' '}
          Add New Book
        </button>
      )}
      {showForm && (
        <NewBookForm
          onSuccess={() => {
            setShowForm(false);
            fetchBooks(pageSize, pageNum, [], isSorted).then((data) => {
              setBooks(data.books);
            });
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      {updatingBook && (
        <UpdateBookForm
          book={updatingBook}
          onSuccess={() => {
            setUpdatingBook(null);
            fetchBooks(pageSize, pageNum, [], isSorted).then((data) => {
              setBooks(data.books);
              setUpdatingBook(null);
            });
          }}
          onCancel={() => setUpdatingBook(null)}
        />
      )}

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID:</th>
            <th>Title:</th>
            <th>Author:</th>
            <th>Publisher:</th>
            <th>ISBN:</th>
            <th>Classification:</th>
            <th>Category:</th>
            <th>Page Count:</th>
            <th>Price:</th>
            <th>Actions:</th>
          </tr>
        </thead>
        <tbody>
          {books.map((b: Book) => (
            <tr key={b.bookId}>
              <td>{b.bookId}</td>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.publisher}</td>
              <td>{b.isbn}</td>
              <td>{b.classification}</td>
              <td>{b.category}</td>
              <td>{b.pageCount}</td>
              <td>{b.price}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm w-100 mb-1"
                  onClick={() => setUpdatingBook(b)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm w-100 "
                  onClick={() => handleDelete(b.bookId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBookView;
