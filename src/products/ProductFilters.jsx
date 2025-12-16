import { useRecoilState, useRecoilValue } from "recoil";
import {
  searchState,
  categoryState,
  priceState,
  productsState,
} from "../recoil/atoms/productAtoms";

const ProductFilters = () => {
  const products = useRecoilValue(productsState);
  const [search, setSearch] = useRecoilState(searchState);
  const [category, setCategory] = useRecoilState(categoryState);
  const [price, setPrice] = useRecoilState(priceState);

  const categories = [
    "all",
    ...Array.from(new Set(products.map((p) => p.category.toLowerCase()))),
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <input
        type="text"
        placeholder="Search product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white bg-white dark:bg-gray-700"
      />

      <select
        value={category.toLowerCase()}
        onChange={(e) => setCategory(e.target.value)}
        className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white bg-white dark:bg-gray-700"
      >
        {categories.map((c) => (
          <option key={c} value={c}>
            {c.charAt(0).toUpperCase() + c.slice(1)}
          </option>
        ))}
      </select>

      <div>
        <label className="text-sm text-gray-500 dark:text-gray-300">
          Max Price: ₹{price}
        </label>
        <input
          type="range"
          min="0"
          max="100000"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default ProductFilters;
