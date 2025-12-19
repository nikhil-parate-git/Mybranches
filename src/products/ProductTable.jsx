import { useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { filteredProductsState } from "../recoil/selectors/productSelectors";
import { productsState, pageState } from "../recoil/atoms/productAtoms";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { themeState } from "../recoil/atoms/ThemeAtom";

const ProductTable = ({ setEditProduct }) => {
  const filteredProducts = useRecoilValue(filteredProductsState);
  const [products, setProducts] = useRecoilState(productsState);
  const [page, setPage] = useRecoilState(pageState);
  const theme = useRecoilValue(themeState);

  const perPage = 5;
  const totalPages = Math.ceil(filteredProducts.length / perPage);

  const paginated = useMemo(() => {
    const start = (page - 1) * perPage;
    return filteredProducts.slice(start, start + perPage);
  }, [filteredProducts, page]);

  const deleteProduct = (id) =>
    setProducts(products.filter((p) => p.id !== id));

  const textColor = theme === "dark" ? "text-gray-100" : "text-gray-900";
  const headerBg =
    theme === "dark"
      ? "bg-gray-800 text-gray-300"
      : "bg-gray-100 text-gray-500";
  const rowHover = theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-50";
  const borderColor = theme === "dark" ? "border-gray-600" : "border-gray-200";

  return (
    <>
      <div className="overflow-x-auto rounded-lg shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className={`${headerBg}`}>
            <tr>
              <th className={`py-2 px-4 border-b ${borderColor}`}>Image</th>
              <th className={`py-2 px-4 border-b ${borderColor}`}>Name</th>
              <th className={`py-2 px-4 border-b ${borderColor}`}>Category</th>
              <th className={`py-2 px-4 border-b ${borderColor}`}>Price</th>
              <th className={`py-2 px-4 border-b ${borderColor}`}>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((p) => (
              <tr key={p.id} className={`border-b ${borderColor} ${rowHover}`}>
                <td className="py-2 px-4">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className={`${textColor} py-2 px-4`}>{p.name}</td>
                <td className={`${textColor} py-2 px-4`}>{p.category}</td>
                <td className={`${textColor} py-2 px-4`}>₹{p.price}</td>
                <td className="py-2 px-4 flex items-center gap-3">
                  <button
                    className="text-indigo-600 cursor-pointer active:scale-90 mt-4 dark:text-indigo-400 hover:text-indigo-800"
                    onClick={() => setEditProduct(p)}
                  >
                    <FiEdit size={18} />
                  </button>
                  <button
                    className="text-red-500 mt-4 cursor-pointer active:scale-90 dark:text-red-400 hover:text-red-700"
                    onClick={() => deleteProduct(p.id)}
                  >
                    <FiTrash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end items-center gap-3 mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className={`px-3 py-1 border rounded cursor-pointer active:scale-90 disabled:opacity-50 ${borderColor} ${textColor}`}
        >
          Prev
        </button>
        <span className={`${textColor} text-sm `}>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className={`px-3 cursor-pointer active:scale-90 py-1 border rounded disabled:opacity-50 ${borderColor} ${textColor}`}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default ProductTable;
