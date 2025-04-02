import { useState } from 'react';
import { Book } from '../../types/Book';
import { addBook } from '../../api/BooksAPI';
import '../../style/Forms.css';

interface NewBookFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const NewBookForm = ({ onSuccess, onCancel }: NewBookFormProps) => {
  const [formData, setFormData] = useState<Book>({
    bookId: 0,
    title: '',
    author: '',
    publisher: '',
    isbn: '',
    classification: '',
    category: '',
    pageCount: 0,
    price: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addBook(formData);
    onSuccess();
  };

  return (
    <div className="card p-4">
      <h2 className="card-title text-center">Add New Book</h2>
      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label className="form-label">Title:</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Author:</label>
          <input
            type="text"
            name="author"
            className="form-control"
            value={formData.author}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Publisher:</label>
          <input
            type="text"
            name="publisher"
            className="form-control"
            value={formData.publisher}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">ISBN:</label>
          <input
            type="text"
            name="isbn"
            className="form-control"
            value={formData.isbn}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Classification:</label>
          <input
            type="text"
            name="classification"
            className="form-control"
            value={formData.classification}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Category:</label>
          <input
            type="text"
            name="category"
            className="form-control"
            value={formData.category}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Page Count:</label>
          <input
            type="number"
            name="pageCount"
            className="form-control"
            value={formData.pageCount}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Price:</label>
          <input
            type="number"
            name="price"
            className="form-control"
            value={formData.price}
            onChange={handleChange}
          />
        </div>

        <div className="d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-success">
            Add Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewBookForm;
