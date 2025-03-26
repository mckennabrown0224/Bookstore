import { useBooks } from "../../context/BookContext";

const SortCheckbox = () => {
  const { isSorted, setIsSorted, setPageNum } = useBooks(); // ✅ Use context instead of props

  return (
    <div className="d-flex align-items-center">
      <label className="form-check-label" htmlFor="sortCheckbox">
        Sort by Title&nbsp;&nbsp;
      </label>
      <input
        type="checkbox"
        className="form-check-input me-2"
        id="sortCheckbox"
        checked={isSorted}
        onChange={() => {
          setIsSorted(!isSorted);
          setPageNum(1); // ✅ Reset to first page when sorting changes
        }}
      />
    </div>
  );
};

export default SortCheckbox;

  