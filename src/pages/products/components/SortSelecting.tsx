import useProductSearch from "../hooks/useProductSearch";

const SortSelecting = () => {
  const { sortBy, sortDir, updateMultipleParams } = useProductSearch();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [newSortBy, newSortDir] = e.target.value.split("-");
    updateMultipleParams({
      sortBy: newSortBy,
      sortDir: newSortDir,
    });
  };

  return (
    <div className="flex items-center">
      <label htmlFor="sort" className="mr-2 text-sm text-muted-foreground">
        Sort by:
      </label>
      <select
        id="sort"
        className="border rounded p-1"
        value={`${sortBy}-${sortDir}`}
        onChange={handleSortChange}
      >
        <option value="id-asc">Default</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="name-asc">Name: A-Z</option>
        <option value="name-desc">Name: Z-A</option>
      </select>
    </div>
  );
};

export default SortSelecting;
