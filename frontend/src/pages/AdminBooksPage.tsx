import { useBooks } from '../context/BookContext';
import Header from '../components/Header';
import CategoryFilter from '../components/bookView/CategoryFilter';
import ResultsPerPageDropdown from '../components/bookView/ResultsPerPageDropdown';
import SortCheckbox from '../components/bookView/SortCheckbox';
import PaginationControls from '../components/bookView/Pagination';
import AdminBookView from '../components/adminBookView/AdminBookView';

function AdminBooksPage() {
  const { books, pageNum, totalPages, pageSize, setPageNum, setPageSize } = useBooks();

  return (
    <div className="container mt-4">
      <Header />
      <h2>Admin View</h2>
      <br/>
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 p-3 position-sticky top-0">
          <div className="bg-light p-3 rounded border border-1 border-muted shadow-sm">
            <div className="mb-3">
              <CategoryFilter />
            </div>
            <div className="mb-3">
              <ResultsPerPageDropdown 
                pageSize={pageSize} 
                onPageSizeChange={(newSize) => {
                  setPageSize(newSize);
                  setPageNum(1); // Reset to page 1 when changing results per page
                }} 
              />
            </div>
            <div className="mb-3">
              <SortCheckbox />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-md-9">
          <AdminBookView />
          <div className="d-flex justify-content-center mt-3">
            <PaginationControls 
              currentPage={pageNum}
              totalPages={totalPages}
              onPageChange={setPageNum}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminBooksPage;
