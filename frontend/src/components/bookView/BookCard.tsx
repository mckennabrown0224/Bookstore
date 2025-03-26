import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/ShoppingCartContext';
import { Book } from '../../types/Book';
import { ShoppingCartItem } from '../../types/ShoppingCartItem';

function BookCard({ book }: { book: Book }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const newItem: ShoppingCartItem = {
      bookId: book.bookId,
      title: book.title,
      author: book.author,
      price: book.price,
      quantity: 1,
      itemSubtotal: book.price * 1,
    };

    addToCart(newItem);
    navigate('/shopping-cart');
  };

  return (
    <div key={book.bookId} className="book-card">
      <div className="book-info">
        <h5 className="book-info"><strong>{book.title}</strong></h5>
        <ul className="list-unstyled">
          <li className="book-info">
            <strong>Author:</strong> {book.author}
          </li>
          <li className="book-info">
            <strong>Publisher:</strong> {book.publisher}
          </li>
          <li className="book-info">
            <strong>ISBN:</strong> {book.isbn}
          </li>
          <li className="book-info">
            <strong>Classification:</strong> {book.classification}
          </li>
          <li className="book-info">
            <strong>Category:</strong> {book.category}
          </li>
          <li className="book-info">
            <strong>Page Count:</strong> {book.pageCount} pages
          </li>
          <li className="book-info">
            <strong>Price:</strong> ${book.price.toFixed(2)}
          </li>
        </ul>
      </div>
      <button className="add-to-cart" onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
}

export default BookCard;
