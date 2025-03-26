import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import BooksPage from './pages/BooksPage';
import { CartProvider } from './context/ShoppingCartContext';
import ShoppingCartPage from './pages/ShoppingCartPage';
import { BookProvider } from './context/BookContext';

function App() {
  return (
    <>
      <BookProvider>
        <CartProvider>
          <Router>
            <Routes>
              <Route path="/" element={<BooksPage />} />
              <Route path="/books" element={<BooksPage />} />
              <Route path="/shopping-cart" element={<ShoppingCartPage />} />
            </Routes>
          </Router>
        </CartProvider>
      </BookProvider>
    </>
  );
}

export default App;
