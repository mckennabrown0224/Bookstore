import Header from "../components/Header";
import ShoppingCartList from "../components/shoppingCartView/ShoppingCartList";
import CartSummary from "../components/shoppingCartView/ShoppingCartTotals";
import "../style/ShoppingCart.css";

function ShoppingCartPage() {
  return (
    <div className="container mt-4">
      <Header />
      <h2 className="text-center fw-bold mb-4">Your Cart</h2>
      <div className="row">
        {/* Cart List Section */}
        <div className="col-md-8">
          <div className="p-3 border rounded bg-light shadow-sm">
            <ShoppingCartList />
          </div>
        </div>
        {/* Cart Summary Section */}
        <div className="col-md-4">
          <div className="p-3 border rounded bg-light shadow-sm">
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCartPage;
