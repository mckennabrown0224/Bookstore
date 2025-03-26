import { useBooks } from "../../context/BookContext";

const PaginationControls = () => {
  const { pageNum, totalPages, setPageNum } = useBooks(); // ✅ Use context instead of props

  return (
    <div className="d-flex justify-content-center align-items-center mt-4">
      <button
        className="btn btn-primary me-2"
        disabled={pageNum === 1}
        onClick={() => setPageNum(pageNum - 1)}
      >
        Previous
      </button>

      <div className="btn-group">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            className={`btn ${pageNum === index + 1 ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setPageNum(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <button
        className="btn btn-primary ms-2"
        disabled={pageNum === totalPages}
        onClick={() => setPageNum(pageNum + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;

  