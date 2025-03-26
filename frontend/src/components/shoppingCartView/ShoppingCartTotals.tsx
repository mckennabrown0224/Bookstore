import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/ShoppingCartContext";
import '../../style/ShoppingCart.css'

const CartSummary = () => {
  const navigate = useNavigate();
  const { cartTotal, clearCart } = useCart();

  return (
    <div className="cart-summary">
      <h3>Total: ${cartTotal.toFixed(2)}</h3>
      <div className="cart-buttons">
        <button className="checkout-button" onClick={() => alert("Proceeding to checkout...")}>
          Checkout
        </button>
        <button className="clear-button" onClick={() => clearCart()}>Clear Cart</button>
        <button className="browse-button" onClick={() => navigate("/books")}>Continue Browsing</button>
      </div>
    </div>
  );
};

export default CartSummary;
