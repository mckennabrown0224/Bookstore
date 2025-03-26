import { useCart } from '../../context/ShoppingCartContext';
import { ShoppingCartItem } from '../../types/ShoppingCartItem';
import '../../style/ShoppingCart.css';

const ShoppingCartList = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCart();

  if (cart.length === 0) {
    return <p className="text-center">Your cart is empty.</p>;
  }

  return (
    <ul className="cart-list">
      {cart.map((item: ShoppingCartItem) => (
        <li key={item.bookId} className="cart-item">
          <div className="cart-item-info">
            <p className="cart-item-title">
              {item.title}{' '}
              <span className="cart-item-author">by {item.author}</span>
            </p>
            <p>Price: ${item.price.toFixed(2)}</p>
            <p>Subtotal: ${item.itemSubtotal.toFixed(2)}</p>
          </div>
          <div className="cart-item-buttons">
            <div className="quantity-section">
              <p className="quantity-header">Quantity in Cart:</p>
              <div className="quantity-controls">
                <button
                  className="quantity-controls-button"
                  onClick={() => decreaseQuantity(item.bookId)}
                >
                  {' '}
                  -{' '}
                </button>
                <span> {item.quantity} </span>
                <button
                  className="quantity-controls-button"
                  onClick={() => increaseQuantity(item.bookId)}
                >
                  {' '}
                  +{' '}
                </button>
              </div>
              <br />
              <button
                className="bad-button"
                onClick={() => removeFromCart(item.bookId)}
              >
                Remove from Cart
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ShoppingCartList;
