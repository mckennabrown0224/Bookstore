import { useBooks } from '../context/BookContext';
import Header from '../components/Header';
import BookList from '../components/bookView/BookList';
import CategoryFilter from '../components/bookView/CategoryFilter';
import ResultsPerPageDropdown from '../components/bookView/ResultsPerPageDropdown';
import SortCheckbox from '../components/bookView/SortCheckbox';
import PaginationControls from '../components/bookView/PaginationControls';
import CartSummary from '../components/bookView/ShoppingCartSummary';

function BooksPage() {
  useBooks();

  return (
    <div className="container mt-4">
      <Header />
      <CartSummary />
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 p-3 position-sticky top-0">
          <div className="bg-light p-3 rounded border border-1 border-muted shadow-sm">
            <div className="mb-3">
              <CategoryFilter />
            </div>
            <div className="mb-3">
              <ResultsPerPageDropdown />
            </div>
            <div>
              <SortCheckbox />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-md-9">
          <BookList />
          <div className="d-flex justify-content-center mt-3">
            <PaginationControls />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BooksPage;
