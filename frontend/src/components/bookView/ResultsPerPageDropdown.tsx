interface ResultsPerPageProps {
  pageSize: number;
  onPageSizeChange: (newSize: number) => void;
}

const ResultsPerPageDropdown = ({ pageSize, onPageSizeChange }: ResultsPerPageProps) => {
  return (
    <div className="d-flex align-items-center mt-3">
      <label className="me-2">Results per page:</label>
      <select
        value={pageSize}
        onChange={(e) => {
          onPageSizeChange(Number(e.target.value));
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
