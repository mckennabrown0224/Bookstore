import { useEffect, useState } from 'react';
import { useBooks } from '../../context/BookContext';
import '../../style/CategoryFilter.css';

function CategoryFilter() {
  const { selectedCategories, setSelectedCategories } = useBooks(); // ✅ Use context instead of props
  const [categories, setCategories] = useState<string[]>([]);

  // Fetch categories when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'https://bookstore-mbrown-backend.azurewebsites.net/api/Bookstore/GetBookCategories'
        );
        const data = await response.json();
        console.log('Fetched categories: ', data);

        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };

    fetchCategories();
  }, []); // Dependency array ensures this effect runs only once

  // Handle checkbox selection changes
  function handleCheckboxChange({ target }: { target: HTMLInputElement }) {
    const updatedCategories = selectedCategories.includes(target.value)
      ? selectedCategories.filter((x) => x !== target.value) // Remove if already selected
      : [...selectedCategories, target.value]; // Add if newly selected

    setSelectedCategories(updatedCategories); // ✅ Update context
  }

  return (
    <div className="category-filter">
      <h5>Book Categories:</h5>
      <div className="category-list">
        {categories.map((c) => (
          <div key={c} className="category-item">
            <input
              className="category-checkbox"
              type="checkbox"
              id={c}
              value={c}
              checked={selectedCategories.includes(c)}
              onChange={handleCheckboxChange}
            />
            <label htmlFor={c}>{c}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;
