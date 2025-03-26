import { useBooks } from "../../context/BookContext";

const ResultsPerPageDropdown = () => {
  const { pageSize, setPageSize, setPageNum } = useBooks(); // ✅ Use context instead of props

  return (
    <div className="d-flex align-items-center mt-3">
      <label className="me-2">Results per page:</label>
      <select
        value={pageSize}
        onChange={(e) => {
          setPageSize(Number(e.target.value));
          setPageNum(1); // ✅ Reset to first page when changing page size
        }}
        className="form-select w-auto d-inline-block"
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
    </div>
  );
};

export default ResultsPerPageDropdown;
