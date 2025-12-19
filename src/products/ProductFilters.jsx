import { useRecoilState, useRecoilValue } from "recoil";
import {
  searchState,
  categoryState,
  priceState,
  productsState,
} from "../recoil/atoms/productAtoms";
import { themeState } from "../recoil/atoms/ThemeAtom";

const ProductFilters = () => {
  const products = useRecoilValue(productsState);
  const [search, setSearch] = useRecoilState(searchState);
  const [category, setCategory] = useRecoilState(categoryState);
  const [price, setPrice] = useRecoilState(priceState);
  const theme = useRecoilValue(themeState);

  const categories = [
    "all",
    ...Array.from(
      new Set(products.map((p) => p.category.toLowerCase()))
    ),
  ];

  const inputBg = theme === "dark" ? "bg-gray-700" : "bg-gray-50";
  const inputText = theme === "dark" ? "text-gray-100" : "text-gray-900";
  const borderColor = theme === "dark" ? "border-gray-600" : "border-gray-300";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <input
        type="text"
        placeholder="Search product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={`border ${borderColor} rounded px-4 py-2 ${inputBg} ${inputText}`}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className={`border ${borderColor} rounded px-4 py-2 ${inputBg} ${inputText}`}
      >
        {categories.map((c) => (
          <option key={c} value={c}>
            {c.toUpperCase()}
          </option>
        ))}
      </select>

      <div>
        <label className="text-sm">Max Price: ₹{price}</label>
        <input
          type="range"
          min="0"
          max="100000"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default ProductFilters;
